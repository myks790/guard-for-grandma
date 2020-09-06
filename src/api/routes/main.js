import express from 'express';
import passport from 'passport';
import config from '../../config';
import userTokenService from '../../services/userTokenService';

const route = express.Router();

export default (router) => {
  router.use(route);
  route.get('/', passport.isAuthenticated, async (req, res) => {
    const { email } = req.user || '';
    const { accessToken, expiresIn, refreshTokenExpiresIn } = userTokenService.getToken();
    const context = {
      email,
      host: config.host,
      KAKAO_REST_API_KEY: config.KAKAO_REST_API_KEY,
      isAccessToken: !!accessToken,
      expiresIn,
      refreshTokenExpiresIn,
    };
    res.render('index', context);
  });

  router.get('/updateExpireIn', (req, res) => {
    userTokenService.updateExpireIn();
  });
};
