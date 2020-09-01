import express from 'express';
import loginout from './routes/loginout';

export default () => {
  const router = express.Router();
  loginout(router);
  return router;
};
