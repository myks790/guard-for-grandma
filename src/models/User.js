import Sequelize from 'sequelize';
import sequelize from '../loaders/sequelizeLoader';

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(50),
  },
  password: {
    type: Sequelize.STRING(100),
  },
});

export default User;
