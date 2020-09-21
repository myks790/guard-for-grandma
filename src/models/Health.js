import Sequelize from 'sequelize';
import sequelize from '../loaders/sequelizeLoader';

const Health = sequelize.define('Health', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.ENUM,
    values: ['router', 'client', 'nvr'],
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['up', 'down'],
    allowNull: false,
  },
});

export default Health;
