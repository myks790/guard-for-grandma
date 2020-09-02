import schedule from 'node-schedule';
import healthCheckService from './healthCheckService';

class ScheduleService {
  constructor(_healthCheckService) {
    this.healthCheckService = _healthCheckService;
  }

  start() {
    schedule.scheduleJob('*/5 * * * *', () => { this.healthCheckService.checkRouter(); });
  }
}

const scheduleService = new ScheduleService(healthCheckService);
export default scheduleService;
