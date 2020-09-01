import privateConfig from './privateConfig';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  host: 'http://myks790.iptime.org:41085',
  port: process.env.PORT || 8080,
  api: {
    prefix: '',
  },
  ...privateConfig,
};
