import express from 'express';
import loginout from './routes/loginout';
import healthCheck from './routes/healthCheck';

export default () => {
  const router = express.Router();
  loginout(router);
  healthCheck(router);
  return router;
};
