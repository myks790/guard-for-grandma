import Sequelize from 'sequelize';
import sequelize from '../loaders/sequelizeLoader';

const LoginLog = sequelize.define('LoginLog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(50),
  },
  password: {
    type: Sequelize.STRING(50),
  },
  status: {
    type: Sequelize.ENUM,
    values: ['ok', 'fail'],
    allowNull: false,
  },
});

export default LoginLog;
