const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cc_db', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
