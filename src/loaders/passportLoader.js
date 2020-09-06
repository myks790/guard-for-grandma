import passport from 'passport';
import LocalStrategy from 'passport-local';
import config from '../config';
import LoginLog from '../models/LoginLog';
import userService from '../services/userService';

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializeUser');
  console.log(user);
  done(null, user);
});

passport.use('basic', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
  },
  async (email, _password, done) => {
    const success = await userService.verify(email, _password);
    if (success) {
      LoginLog.create({ email, password: null, status: 'ok' });
      return done(null, { email: config.email });
    }
    LoginLog.create({ email, password: _password, status: 'fail' });
    return done(null, false, { message: 'Incorrect password' });
  },
));

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
