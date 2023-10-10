const Sequelize = require('sequelize');
const dbConfig  = require('./config/config.js');
const UserModel = require('./api/caps/model.js').UserModel;


const sequelize = new Sequelize({
  dialect: 'oracle',
  username: dbConfig.user,
  password: dbConfig.password,
  logging: false,
  "define":
    { "id": false,
      "freezeTableName": true,
      "createdAt": true, 
      "updatedAt": true },
  dialectOptions: {connectString: dbConfig.connectString}});


sequelize.sync()
  .then(() => {
    //console.log('This is message from "sequelize.js", connected to DB');
  });

exports.User = UserModel(sequelize, Sequelize);