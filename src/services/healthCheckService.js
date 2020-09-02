import axios from 'axios';
import moment from 'moment';
import config from '../config';
import Queue from '../utils/Queue';
import messageService from './messageService';

class HealthCheckService {
  constructor(_axios) {
    this.axios = _axios;
    this.store = new Queue(12);
    this.errorStore = new Queue(4);
  }

  handleAndSendError() {
    while (!this.store.isEmpty()) {
      const data = this.store.pop();
      if (data.error === 1) {
        this.errorStore.push(data);
        const errortimes = this.errorStore.getArray().map((item) => item.datetime);
        messageService.sendMe(`Router healthCheck fail : \n${errortimes.join('\n')}`);
      }
    }
  }

  async checkRouter() {
    let error = 0;
    try {
      const result = await this.axios.get(config.router);
      if (result.status === 200) {
        error = 0;
      } else {
        error = 1;
        this.handleAndSendError();
      }
    } catch (err) {
      error = 1;
      this.handleAndSendError();
    }
    this.store.push({ datetime: moment().format('MM/DD hh:mm'), error });
  }
}

const healthCheckService = new HealthCheckService(axios);
export default healthCheckService;
