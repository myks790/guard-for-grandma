import session from 'express-session';

export default (app) => {
  app.use(session({
    secret: 'SAME_SECRET',
    resave: false,
    saveUninitialized: true,
  }));
};
