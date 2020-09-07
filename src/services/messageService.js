import axios from 'axios';
import config from '../config';
import userTokenService from './userTokenService';

const templateObj = {
  object_type: 'text',
  text: '',
  link: {
    web_url: config.host,
    mobile_web_url: config.host,
  },
  button_title: '바로 확인',
};

class MessageService {
  constructor(_axios) {
    this.axios = _axios;
  }

  async sendMe(_text) {
    templateObj.text = _text;
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

  async getFriendsUuid() {
    try {
      const result = await this.axios.get('https://kapi.kakao.com/v1/api/talk/friends', {
        headers: {
          Authorization: `${userTokenService.getTokenType()} ${userTokenService.getAccessToken()}`,
        },
      });
      if (result.status === 200) {
        return result.data.elements.map((e) => e.uuid);
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async sendAll(_text) {
    templateObj.text = _text;
    if (userTokenService.getAccessToken()) {
      let uuids = await this.getFriendsUuid();
      if (uuids.length > 5) {
        uuids = uuids.slice(0, 5);
      }
      if (uuids.length > 0) {
        const result = await this.axios.post('https://kapi.kakao.com/v1/api/talk/friends/message/default/send', `receiver_uuids=${JSON.stringify(uuids)}&template_object=${JSON.stringify(templateObj)}`, {
          headers: {
            Authorization: `${userTokenService.getTokenType()} ${userTokenService.getAccessToken()}`,
          },
        });
        if (result.status === 200) {
          console.log('sendAll ', result.status);
        }
      }
    }
  }
}

const messageService = new MessageService(axios);
export default messageService;
