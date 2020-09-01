import axios from 'axios';
import schedule from 'node-schedule';
import config from '../config';
import messageService from './messageService';

class HealthCheckService {
  constructor(_axios) {
    this.axios = _axios;
    schedule.scheduleJob('*/5 * * * *', () => { this.checkRouter(); });
  }

  async checkRouter() {
    const result = await this.axios.get(config.router);
    if (result.status === 200) {
      messageService.sendMe(`call checkRouter status : , ${result.status}`);
    }
  }
}

const healthCheckService = new HealthCheckService(axios);
export default healthCheckService;
