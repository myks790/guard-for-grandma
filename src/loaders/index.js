import expressLoader from './expressLoader';
import scheduleService from '../services/scheduleService';

export default (app) => {
  expressLoader(app);

  // scheduleService.start();
};
