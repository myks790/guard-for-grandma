import express from 'express';
import path from 'path';
import routes from '../api';
import config from '../config';

export default (app) => {
  app.use(express.json());
  app.use(config.api.prefix, routes());
  app.use(express.urlencoded({ extended: false }));
  app.set('views', `${path.resolve('src')}/views`);
  app.set('view engine', 'ejs');
};
