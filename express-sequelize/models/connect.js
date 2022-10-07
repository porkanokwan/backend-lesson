const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("cc11_todo_list", "root", "19051999Kanokwan", {
  host: "localhost",
  dialect:
    "mysql" /* choose one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

sequelize
  .authenticate()
  .then((resolve) => {
    console.log(resolve); // undefined เท่ากับว่า resolve ไม่ได้ส่งอะไรมา
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

module.exports = sequelize;
