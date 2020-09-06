import axios from 'axios';
import querystring from 'querystring';
import config from '../config';

class UserTokenService {
  constructor() {
    this.accessToken = '';
    this.refreshToken = '';
    this.tokenType = '';
    this.expiresIn = 0;
    this.refreshTokenExpiresIn = 0;
  }

  set(accessToken, refreshToken, tokenType, expiresIn, refreshTokenExpiresIn) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getTokenType() {
    return this.tokenType;
  }

  getExpireIn() {
    return this.expiresIn;
  }

  getRefreshTokenExpiresIn() {
    return this.refreshTokenExpiresIn;
  }

  getToken() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      tokenType: this.tokenType,
      expiresIn: this.expiresIn,
      refreshTokenExpiresIn: this.refreshTokenExpiresIn,
    };
  }

  async updateExpireIn() {
    if (this.accessToken) {
      const result = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `${this.tokenType} ${this.accessToken}`,
        },
      });
      if (result.status === 200) {
        this.expiresIn = result.data.expires_in;
      }
    }
  }

  async refresh() {
    if (this.accessToken) {
      const result = await axios.post('https://kauth.kakao.com/oauth/token', querystring.stringify({
        grant_type: 'refresh_token',
        client_id: config.KAKAO_REST_API_KEY,
        refresh_token: this.refreshToken,
      }), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      if (result.status === 200) {
        this.tokenType = result.data.token_type;
        this.accessToken = result.data.access_token;
        this.expiresIn = result.data.expires_in;
        if (result.data.refresh_token) {
          this.refreshToken = result.data.refresh_token;
        }
        if (result.data.refresh_token_expires_in) {
          this.refreshTokenExpiresIn = result.data.refresh_token_expires_in;
        }
      }
    }
  }
}

const userTokenService = new UserTokenService();
export default userTokenService;
