class UserTokenService {
  constructor() {
    this.accessToken = '';
    this.refreshToken = '';
    this.tokenType = '';
  }

  set(accessToken, refreshToken, tokenType) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.tokenType = tokenType;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getTokenType() {
    return this.tokenType;
  }
}

const userTokenService = new UserTokenService();
export default userTokenService;
