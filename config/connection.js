require('dotenv').config();

const Sequelize = require('sequelize');

// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize('notetaker_db', process.env.DB_USER, process.env.DB_PW,{
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;
