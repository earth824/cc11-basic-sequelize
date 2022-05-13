const sequelize = require('./db');
const User = require('./user');
const Todo = require('./todo');

User.hasMany(Todo, {
  foreignKey: {
    allowNull: false,
    name: 'userId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});

Todo.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: 'userId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});

module.exports = { User, Todo, sequelize };
