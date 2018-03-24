const Sequelize = require('sequelize');
const db_config = require('../.././db_config');

const sql_conn = new Sequelize(
  db_config.databaseName,
  db_config.userName,
  db_config.password,
  {
    host: db_config.server,
    port: db_config.port,
    dialect: 'mysql',
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

sql_conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Users = sql_conn.define('users', {
  userid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  deletedAt: Sequelize.DATE,
  lastlogin: Sequelize.DATE,
  hash: Sequelize.STRING,
  salt: Sequelize.STRING,
  role: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports = {
  sql_conn, Users
};
