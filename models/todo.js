const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  dueDate: DataTypes.DATEONLY
});

module.exports = Todo;
