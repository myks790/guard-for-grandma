import schedule from 'node-schedule';
import healthCheckService from './healthCheckService';
import userTokenService from './userTokenService';
import messageService from './messageService';
import snapshotService from './snapshotService';

export default {
  start() {
    // schedule.scheduleJob('* * * * * *', () => { snapshotService.getSnapshot(); });
    schedule.scheduleJob('*/5 * * * *', () => { healthCheckService.checkRouter(); });
    schedule.scheduleJob('0 */6 * * *', () => { userTokenService.refresh(); });
    schedule.scheduleJob('0 8 * * *', () => { messageService.sendMe('I\'m alive - guard for grandma server'); });
  },
};
