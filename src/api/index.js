import express from 'express';
import loginout from './routes/loginout';
import healthCheck from './routes/healthCheck';
import main from './routes/main';

export default () => {
  const router = express.Router();
  loginout(router);
  healthCheck(router);
  main(router);
  return router;
};
