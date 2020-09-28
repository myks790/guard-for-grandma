import axios from 'axios';
import moment from 'moment';
import config from '../config';
import Queue from '../utils/Queue';
import messageService from './messageService';
import Health from '../models/Health';

class HealthCheckService {
  constructor(_axios) {
    this.axios = _axios;
    this.errorStoreSize = 9;
    this.errorStore = this.createErrorStore();
    this.term = 2;
  }

  createErrorStore() {
    return new Queue(this.errorStoreSize);
  }

  sendErrorMessage() {
    while (!this.errorStore.isEmpty() && this.errorStore.size() > this.term) {
      messageService.sendMe(`Router healthCheck fail : \n${this.errorStore.getArray().join('\n')}`);
      if (this.term < this.errorStoreSize - 1) {
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
          messageService.sendMe('Router healthCheck success');
          this.term = 2;
          this.errorStore = this.createErrorStore();
        }
      } else {
        Health.create({ name: 'router', status: 'down' });
        this.errorStore.push(moment().format('DD일 HH:mm'));
        this.sendErrorMessage();
      }
    } catch (err) {
      Health.create({ name: 'router', status: 'down' });
      this.errorStore.push(moment().format('DD일 HH:mm'));
      this.sendErrorMessage();
    }
  }
}

const healthCheckService = new HealthCheckService(axios);
export default healthCheckService;
