import axios from 'axios';
import config from '../config';
import userTokenService from './userTokenService';

const feedTemplateObj = {
  object_type: 'feed',
  content: {
    title: 'img title',
    image_url: `${config.host}/image`,
    image_width: 640,
    image_height: 360,
    description: '',
    link: {
      web_url: config.host,
      mobile_web_url: config.host,
    },
  },
  buttons: [
    {
      title: '자세히 보기',
      link: {
        web_url: config.host,
        mobile_web_url: config.host,
      },
    },
  ],
};

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

  async sendAll(_text, imgUrl) {
    feedTemplateObj.content.title = '감지됨';
    feedTemplateObj.content.description = _text;
    feedTemplateObj.content.image_url = imgUrl;
    feedTemplateObj.content.link.web_url = imgUrl;
    feedTemplateObj.content.link.mobile_web_url = imgUrl;
    feedTemplateObj.buttons = [
      {
        title: '자세히 보기',
        link: {
          web_url: imgUrl,
          mobile_web_url: imgUrl,
        },
      },
    ];

    if (userTokenService.getAccessToken()) {
      let uuids = await this.getFriendsUuid();
      if (uuids.length > 5) {
        uuids = uuids.slice(0, 5);
      }
      if (uuids.length > 0) {
        const result = await this.axios.post('https://kapi.kakao.com/v1/api/talk/friends/message/default/send', `receiver_uuids=${JSON.stringify(uuids)}&template_object=${JSON.stringify(feedTemplateObj)}`, {
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
