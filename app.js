import express from 'express';
import config from './config';
import loaders from './loaders';

async function startServer() {
  const app = express();
  loaders(app);
  app.listen(config.port);
}

startServer();
