import axios from 'axios';
import moment from 'moment';
import config from '../config';
import Queue from '../utils/Queue';
import messageService from './messageService';
import Health from '../models/Health';

class HealthCheckService {
  constructor(_axios) {
    this.axios = _axios;
    this.errorStore = new Queue(15);
    this.term = 2;
  }

  sendErrorMessage() {
    while (!this.errorStore.isEmpty() && this.errorStore.size() > this.term) {
      // messageService.sendMe(`Router healthCheck fail : \n${this.errorStore.getArray().join('\n')}`);
      if (this.term < 14) {
        this.term += 2;
      }
    }
  }

  async checkRouter() {
    try {
      const result = await this.axios.get(config.router);
      if (result.status === 200) {
        Health.create({ name: 'router', status: 'up' });
        if (this.errorStore.size() > 0) {
          this.term = 2;
          this.errorStore = new Queue(15);
        }
      } else {
        Health.create({ name: 'router', status: 'down' });
        this.errorStore.push(moment().format('DD HH:mm'));
        this.sendErrorMessage();
      }
    } catch (err) {
      Health.create({ name: 'router', status: 'down' });
      this.errorStore.push(moment().format('DD HH:mm'));
      this.sendErrorMessage();
    }
  }
}

const healthCheckService = new HealthCheckService(axios);
export default healthCheckService;
