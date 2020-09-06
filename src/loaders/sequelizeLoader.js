import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.sequelize.dbName, // 데이터베이스 이름
  config.sequelize.username, // 유저 명
  config.sequelize.password, // 비밀번호
  {
    host: config.sequelize.host, // 데이터베이스 호스트
    port: config.sequelize.port,
    dialect: config.sequelize.dialect, // 사용할 데이터베이스 종류
    timezone: '+09:00',
  },
);

sequelize.sync();

export default sequelize;
