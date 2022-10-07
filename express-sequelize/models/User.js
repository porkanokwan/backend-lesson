const { DataTypes } = require("sequelize");
const sequelize = require("./connect");
// const Todos = require("./Todo");

const User = sequelize.define(
  // default: sequelize จะใช้ library inflection แปลงชื่อ Model เป็น plural ให้อัตโนมัติ แล้วไป map to table ที่ชื่อเดียวกับ Model ที่แปลงเป็น plural แล้ว เช่นในนี้ Model name จะเป็น Users มันจะ map ไปที่ table users แต่บางครั้งมันจะแปลงเป็น plural แบบคนละคำ ต้องระวัง
  "User",
  {
    // parameter ตัวที่ 2 เป็น option ซึ่งเป็นตัวกำหนด attribute ของ model (เป็นเหมือนกับการกำหนด column defination หรือ constrain ของแต่ละ col ใน mysql)
    id: {
      //   DataTypes เป็น built-in obj ที่ sequelize สร้างมาให้เรา ซึ่งมันทำหน้าที่ Mapping data type ใน JS ให้เข้ากับ data type ใน mysql ให้เรา เพราะ data type ใน js กับใน mysql ไม่ตรงกันทั้งหมด เลยต้องมีตัว mapping
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false,
      unique: true,
    },
    // เวลา sequelize define model sequelize จะสร้าง property อีก 2 ตัวให้โดยที่เรามองไม่เห็นคือ createdAt, updatedAt จะเรียก property 2 ตัวนี่ว่า Timestamps ซึ่งมันมีประโยชน์คือ ถ้าเรามีการสร้าง/แก้ไขข้อมูลมันจะ สร้าง/update วัน-เวลา ให้อัตโนมัติ
  },
  {
    //   parameter ตัวที่ 3 เอาไว้กำหนดอย่างอื่นได้ เช่น อยากให้ mapping ไป table ที่ต้องการ
    tableName: "user",
    timestamps: false, // ไม่ต้องการ timestamps ใช้ในกรณีที่ table ใน db มีแค่ 2 col แต่ใน model เรากำหนดมา 2 property แต่จริงๆ มี 4 เพราะ มีที่มองไม่เห็นอยู่ 2 อัน พอ property ใน Model กับ col ใน table มีไม่ตรงกันมันจะ error
  }
);

// User.hasMany(Todos, { foreignKey: "userId" });

module.exports = User;
