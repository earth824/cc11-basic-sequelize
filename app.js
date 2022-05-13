// const { User, Todo } = require('./models');
const { sequelize } = require('./models');

sequelize.sync({ force: true });

const run = async () => {
  // const user = await User.findAll();
  // console.log(JSON.stringify(user, null, 2));
  // const todo = await Todo.findAll({
  //   include: User
  // });
  // console.log(JSON.stringify(todo, null, 2));

  // raw query
  const result = await sequelize;
};

run();
