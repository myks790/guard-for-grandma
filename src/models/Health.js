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
    values: ['router', 'client'],
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['up', 'down'],
    allowNull: false,
  },
});

Health.sequelize.sync();

export default Health;
