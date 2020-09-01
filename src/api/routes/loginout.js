import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import config from '../../config';
import userTokenService from '../../services/userTokenService';

const route = express.Router();

export default (router) => {
  router.use(route);

  route.get('/logout', async (req, res) => {
    res.json({ message: 'logout success' });
  });

  route.get('/login', async (req, res) => {
    const context = { host: config.host, KAKAO_REST_API_KEY: config.KAKAO_REST_API_KEY };
    res.render('login', context);
  });

  route.get('/auth/callback', async (req, res) => {
    const result = await axios.post('https://kauth.kakao.com/oauth/token', querystring.stringify({
      grant_type: 'authorization_code',
      client_id: config.KAKAO_REST_API_KEY,
      redirect_uri: `${config.host}/auth/callback`,
      code: req.query.code,
    }), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const context = { result: false };
    if (result.status === 200) {
      context.result = true;
      const { access_token, refresh_token, token_type } = result.data;
      userTokenService.set(access_token, refresh_token, token_type);
    }
    res.render('login_callback', context);
  });
};
