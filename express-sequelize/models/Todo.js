const { DataTypes } = require("sequelize");
const sequelize = require("./connect");
// const User = require("./User");

const Todos = sequelize.define(
  "Todo",
  {
    // ที่เขียนทั้งหมดนี้คือการกำหนด constraint ให้กับ col แต่ละตัว ซึ่งถ้ามี error เกิดขึ้น มันจะเกิดใน mysql เพราะ constraint เป็นการกำหนดใน mysql ดังนั้น mysql จะเป็นตัวเช็คและส่ง error ออกมา
    // แต่ mysql validate constraint ได้ไม่เยอะ sequelize เลยมี tool เอาไว้ validate สิ่งที่ mysql validate ไม่ได้ เรียกว่า Validations&Constraints

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true }, // ใน title เป็นได้แค่ตัวอักษร ซึ่งการ validate แบบนี้จะเป็นการ validate ที่ JS ไม่ใช่ที่ mysql
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id", // เป็นการกำหนดว่าในเอา col ชื่อ user_id ไปเก็บไว้ใน userId ที่เป็นชื่อใหม่
      //   references: { model: User, key: "id" },
    },
  },
  {
    timestamps: false,
  }
);

// Todos.belongsTo(User, { foreignKey: "userId" });
module.exports = Todos;
