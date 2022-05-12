const { Sequelize, DataTypes, Op } = require('sequelize');

// authenticate mysql server
const sequelize = new Sequelize('cc_db', 'root', '1234', {
  host: 'localhost',
  port: 3306, // default: 3306
  dialect: 'mysql'
});

// test connection
// sequelize
//   .authenticate()
//   .then(() => console.log('DB connected'))
//   .catch(err => console.log(err));

// define Model mapping to table users
const User = sequelize.define(
  'User', // default map to users; convert User to users
  // eg. Model: Friend; map to table friends
  {
    // column: id created by default
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    username: {
      type: DataTypes.STRING, // default length: 255
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY
      // field: 'birth_date'
    }
  },
  {
    // freezeTableName: true,
    tableName: 'users',
    timestamps: false // disable column: createdAt, updatedAt
    // underscored: true // map Model property to underscored column eg. birthDate map to birth_date
  }
);

// define Model Todo,
// has property below
// id: primary key auto increment,
// title: varchar not null,
// completed: boolean not null default false,
// dueDate: date nullable

// Insert code here
const Todo = sequelize.define(
  'Todo',
  {
    // neglect id: auto create id columm (primary key and auto increment)
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    // dueDate: {
    //   type: DataTypes.DATEONLY
    // },
    dueDate: DataTypes.DATEONLY
  },
  {
    // underscored: true
  }
);

const UserProfile = sequelize.define('UserProfile', {
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING
});

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Order = sequelize.define('Order', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// One - Many
Todo.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'userId' },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});
User.hasMany(Todo, {
  foreignKey: { allowNull: false, name: 'userId' },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});

// One - One
User.hasOne(UserProfile, {
  foreignKey: { allowNull: false, name: 'userId' },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
}); // fk column default: UserId
UserProfile.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'userId' },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});

// Many - Many
User.belongsToMany(Employee, { through: Order });
Employee.belongsToMany(User, { through: Order });

// sequelize.sync({ force: true });

// create user instance. BAD !!!
// const user = new User();
// user.username = 'jack';
// user.password = '4567';
// user.birthDate = new Date('1990-12-11');

// user.save();

// Good create user instance
// const user = User.build({
//   username: 'john',
//   password: '1234',
//   birthDate: '1980-02-28'
// });
// user.save();

const run = async () => {
  // const user = User.build({
  //   username: 'max',
  //   password: '0987',
  //   birthDate: '1985-07-12'
  // });
  // await user.save();
  // user.password = '4321';
  // user.birthDate = '2000-04-13';
  // await user.save();
  // static method: create
  // const todo = await Todo.create({
  //   title: 'Learning',
  //   completed: true,
  //   dueDate: '2022-05-13'
  // });
  // const todo = await Todo.create({
  //   title: 'Exercise'
  // });
  // const todo = await Todo.create({
  //   title: 'Fitness',
  //   dueDate: '2022-05-22'
  // });
  // // console.log(todo.id);
  // // console.log(todo.title);
  // // console.log(todo.createdAt);
  // // console.log(todo.completed);
  // // console.log(todo.dataValues); // Don't do this
  // insert multiple row
  // const todo = await Todo.bulkCreate([
  //   { title: 'Football time', completed: true },
  //   { title: 'Dentist', dueDate: '2022-05-14' },
  //   { title: 'Shopping' }
  // ]);
  // Static update
  // const todo = await Todo.update(
  //   { title: 'Meeting', dueDate: '2023-01-01' },
  //   { where: { id: 4 } }
  // );
  // static delete
  // const todo = await Todo.destroy({
  //   where: { title: 'Exercise', completed: true }
  // });
  // static SELECT method: Simple select
  // const todo = await Todo.findAll();
  // find all with where condition
  // const todo = await Todo.findAll({ where: { id: 1 } });
  // find all: select some attribute
  // const todo = await Todo.findAll({
  //   where: { id: 1 },
  //   attributes: ['id', 'title', 'completed', 'dueDate']
  // });
  // find all: select all attribute except updatedAt
  // const todo = await Todo.findAll({
  //   where: { id: 1 },
  //   attributes: {
  //     exclude: ['updatedAt']
  //   }
  // });
  // complex where condition
  // const todo = await Todo.findAll({
  //   where: {
  //     id: {
  //       [Op.gte]: 3
  //     }
  //   }
  // });
  // const todo = await Todo.findAll({
  //   where: {
  //     title: {
  //       [Op.like]: '%e%'
  //     },
  //     id: {
  //       [Op.lt]: 6
  //     }
  //   }
  // });
  // WHERE id > 3 OR title LIKE '%a%' OR completed = true
  // const todo = await Todo.findAll({
  //   where: {
  //     [Op.or]: [
  //       {
  //         id: {
  //           [Op.gt]: 3
  //         }
  //       },
  //       {
  //         title: {
  //           [Op.like]: '%a%'
  //         }
  //       },
  //       {
  //         completed: true
  //       }
  //     ]
  //   }
  // });
  // Order by
  // const todo = await Todo.findAll({
  //   order: ['title']
  // });
  // order by desc
  // const todo = await Todo.findAll({
  //   order: [['title', 'DESC']]
  // });
  // group by
  // const todo = await Todo.findAll({
  //   group: ['completed'],
  //   attributes: ['completed', sequelize.fn('COUNT', 'completed')]
  // });
  // const todo = await Todo.findAll({
  //   group: ['completed'],
  //   attributes: [
  //     ['completed', 'cp'],
  //     [sequelize.fn('COUNT', 'completed'), 'total']
  //   ],
  //   order: [[sequelize.fn('COUNT', 'completed'), 'DESC']]
  //   // having: {
  //   //   total: 2
  //   // }
  // });
  // console.log(JSON.stringify(todo, null, 2));
  // await User.create({ username: 'jack', password: '1234' });
  // await Todo.bulkCreate([
  //   { title: 'Meeting', user_id: 1 },
  //   { title: 'Doctor', user_id: 1 }
  // ]);
  // await Todo.create({ title: 'Doctor', userId: 1 });
  // const user = await User.create({ username: 'john', password: '1234' });
  // const todos = await Todo.bulkCreate([
  //   { title: 'Metting', userId: user.id },
  //   { title: 'Dentist', userId: user.id },
  //   { title: 'Movie', userId: user.id }
  // ]);

  // const user = await User.findOne({ where: { id: 1 } });

  // include todo
  // const user = await User.findOne({
  //   where: { id: 1 },
  //   include: Todo
  // });

  // const user = await User.findOne({
  //   where: { id: 1 },
  //   attributes: ['id', 'username'],
  //   include: {
  //     model: Todo,
  //     attributes: ['id', 'title', 'completed']
  //   }
  // });
  // console.log(JSON.stringify(user, null, 2));

  const todo = await Todo.findAll({
    include: User
  });

  console.log(JSON.stringify(todo, null, 2));
};

run();
