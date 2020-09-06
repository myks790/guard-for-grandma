import axios from 'axios';
import config from '../config';
import userTokenService from './userTokenService';

class MessageService {
  constructor(_axios) {
    this.axios = _axios;
  }

  async sendMe(_text) {
    const templateObj = {
      object_type: 'text',
      text: _text,
      link: {
        web_url: config.host,
        mobile_web_url: config.host,
      },
      button_title: '바로 확인',
    };
    if (userTokenService.getAccessToken()) {
      const result = await this.axios.post('https://kapi.kakao.com/v2/api/talk/memo/default/send', `template_object=${JSON.stringify(templateObj)}`, {
        headers: {
          Authorization: `${userTokenService.getTokenType()} ${userTokenService.getAccessToken()}`,
        },
      });
      if (result.status === 200) {
        console.log('sendMe ', result.status);
      }
    }
  }
}

const messageService = new MessageService(axios);
export default messageService;
