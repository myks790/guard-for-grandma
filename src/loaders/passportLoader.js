import passport from 'passport';
import LocalStrategy from 'passport-local';
import config from '../config';

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
  async (email, password, done) => {
    if (config.email === email && config.pw === password) {
      return done(null, { email: config.email });
    }
    return done(null, false, { message: 'Incorrect password' });
  },
));

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
