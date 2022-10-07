// Basic concept การสร้าง Model (ยังไม่เชื่อมต่อกับ express)
const { Sequelize, DataTypes, Op } = require("sequelize");

// คำสั่งในการ connect ไปที่ database (mysql server)
const sequelize = new Sequelize("cc11_todo_list", "root", "19051999Kanokwan", {
  host: "localhost",
  dialect:
    "mysql" /* choose one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// console.log(sequelize); // เป็น instance obj ของ Classหรือ Constructor Sequelize
// console.log(sequelize.authenticate()); // authenticate เป็นการสั่งให้ connecting test ไปยัง db ซึ่งจะทำงานแบบ Asynchronus function มันเลยทำให้ค่าที่ return ออกมาเป็น Promise obj
sequelize
  .authenticate()
  .then((resolve) => {
    console.log(resolve); // undefined เท่ากับว่า resolve ไม่ได้ส่งอะไรมา
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

// การสร้าง Model เพื่อให้เป็นแม่แบบของ Table ใน db ซึ่งโดย default sequelize จะพยายามไปหาชื่อ Table ที่จะ Mapping กับชื่อ Model ที่เราตั้ง อย่างในตัวอย่างนี้เราตั้ง ชื่อ Model ว่า User sequelize จะวิ่งไปหา Table ที่ชื่อ user แล้ว mapping กัน
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
    // freezeTableName: true, // freezeTableName คือการกำหนดว่า ให้ mapping model ไปกับ table เลย ไม่ต้องแปลงชื่อ model เป็น plural
    timestamps: false, // ไม่ต้องการ timestamps ใช้ในกรณีที่ table ใน db มีแค่ 2 col แต่ใน model เรากำหนดมา 2 property แต่จริงๆ มี 4 เพราะ มีที่มองไม่เห็นอยู่ 2 อัน พอ property ใน Model กับ col ใน table มีไม่ตรงกันมันจะ error
  }
);

// พอเราสร้าง Model เสร็จ เราจะสามารถเอา Model ที่เราสร้างมา insert, update, delete เข้าไปใน DB ได้
// const userObj = new User({ username: "jamie" }); // userObj = { username: 'jamie' } และจะ mapping ไปที่ table user ให้อัตโนมัติ แต่ sequelize ไม่แนะนำการสร้าง instance แบบนี้

// การ insert ข้อมูลโดยใช้ instance method
// const userObj = User.build({ username: "jane" }); // ใช้ method build (เป็น static method เพราะ ถูกเรียกใช้จาก Class โดยตรง และ build ทำงานแบบ synchronus) แทน new
// save() เป็น method ที่อยู่ใน Class ที่เรา defined model ขึ้นมา แต่ถูกเรียกใช้โดย instance obj จึงถูกเรียกว่า instance method ซึ่งมันจะเป็นตัวที่อนุญาตให้ข้อมูลใน userObj ลงไปใน DB ได้ และมันเป็น function ที่ทำงานเกี่ยวกับ Model จะทำงานแบบ asychronus มันเลย return ค่ามาเป็น Promise obj
// userObj
//   .save() // จะสร้าง Executing (default): INSERT INTO `user` (`id`,`username`) VALUES (DEFAULT,?); อันนี้ขึ้นมาให้ตอนสั่ง run
//   .then((res) => {
// console.log(res); // เวลาจะเรียกใช้ข้อมูลข้างในให้ res.id/ res.username ได้เลย
//     console.log("Execute save");
//   })
//   .catch((err) => console.log(err));

// การ insert, update, delete ข้อมูลโดยใช้ static method
// const userPromise = User.create({ username: "federick" }); // method create ทำงานแบบ asynchronus
// userPromise
//   .then((res) => console.log(JSON.stringify(res, null, 2)))
//   .catch((err) => console.log(err));

// User.update({ username: "velmas" }, { where: { id: 11 } })
//   .then((res) => console.log(JSON.stringify(res, null, 4))) // 4 คือ spacing ที่เว้นวรรคหน้า res ส่วน res จะได้ [ 1 คือ 1 affectedRows ]
//   .catch((err) => console.log(err));

// User.destroy({ where: { id: 13 } })
//   .then((res) => console.log(JSON.stringify(res, null, 2))) // ได้ res เป็น 1 คือ 1 affectedRows มี 1 rowที่ถูกลบ แต่ถ้าลบอันที่ไม่มีใน db res จะเป็น 0 คือไม่มี row ไหนถูกลบ
//   .catch((err) => console.log(err));

// User.findAll().then((res) => console.log(JSON.stringify(res, null, 2))); // res ได้ [ {id: '1', username: 'John'}, {}, ... ]
// User.findAll({ where: { id: 12 } }).then((res) =>
//   console.log(JSON.stringify(res, null, 2))
// ); // res ได้ [ {id: '12', username: 'ryan'} ]

// User.findAll({ where: { id: 12, username: "ryan" } }).then((res) =>
//   console.log(JSON.stringify(res, null, 2))
// ); // res ได้ [ {id: '12', username: 'ryan'} ] แต่ตรง where จะมีเงื่อนไข 2 อย่าง มันจะเอาเงื่อนไข 2 อย่างนั้นมาเชื่อมด้วย AND เสมอ

// แต่ถ้าอยากใช้อย่างอื่นมาเชื่อมเงื่อนไขให้ใช้ Op ในการสั่ง
// User.findAll({
//   where: {
//     [Op.or]: [{ id: 11 }, { id: 12 }, { username: { [Op.like]: "J%" } }],
//   }, // จะได้ statement แบบนี้ SELECT `id`, `username` FROM `user` AS `User` WHERE (`User`.`id` = 11 OR `User`.`id` = 12 OR `User`.`username` LIKE 'J%');
// }).then((res) => console.log(JSON.stringify(res, null, 2)));

// ถ้าอยาก select แค่บาง col ให้เพิ่ม attributes: [ ใส่ชื่อ col ที่อยากได้ ]
// User.findAll({
//   where: {
//     id: [1, 2, 3, 4, 5, 6],
//   },
//   //   attributes: ["username"],
//   attributes: {
//     exclude: ["id"], // เอาทุก col ยกเว้น id
//   },
//   order: ['username'] ถ้าไม่กำหนดทิศทางจะเป็น ASC
//   order: [["username", "desc"], "id"], // SELECT `username` FROM `user` AS `User` WHERE `User`.`id` IN (1, 2, 3, 4, 5, 6) ORDER BY `User`.`username` DESC, `User`.`id` ถ้า username เหมือนกันค่อยมาเรียง id
// }).then((res) => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   where: {
//     id: [1, 2, 3, 4, 5, 6],
//   },
//   attributes: ["username"],
//   attributes: {
//     exclude: ["id"], // เอาทุก col ยกเว้น id
//   },
//   order: ['username'] ถ้าไม่กำหนดทิศทางจะเป็น ASC
//   order: [["username", "desc"], "id"], // SELECT `username` FROM `user` AS `User` GROUP BY `username` ORDER BY `User`.`username` DESC, `User`.`id` ถ้า username เหมือนกันค่อยมาเรียง id
//   group: ["username"],
//   limit: 5,
//   offset: 3,
// }).then((res) => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
// การเปลี่ยนชื่อ col
// attributes: ["id", ["username", "uname"]],
//   attributes: [[sequelize.fn("count", sequelize.col("id")), "total_count"]], // จะได้ SELECT count(`id`) AS `total_count` FROM `user` AS `User`;
// }).then((res) => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   attributes: [[sequelize.fn("max", sequelize.col("id")), "max_id"]], // จะได้ SELECT max(`id`) AS `max_id` FROM `user` AS `User`;
// }).then((res) => console.log(JSON.stringify(res, null, 2)));

// User.findAll({
//   attributes: [
//     [sequelize.fn("max", sequelize.col("id")), "max_id"],
//     "username",
//   ],
//   group: ["username"], // SELECT max(`id`) AS `max_id`, `id` FROM `user` AS `User` GROUP BY `id`;
// }).then((res) => console.log(JSON.stringify(res, null, 2)));

// สร้าง Model todos
const Todos = sequelize.define(
  "Todo",
  {
    // ที่เขียนทั้งหมดนี้คือการกำหนด constraint ให้กับ col แต่ละตัว ซึ่งถ้ามี error เกิดขึ้น มันจะเกิดใน mysql เพราะ constraint เป็นการกำหนดใน mysql ดังนั้น mysql จะเป็นตัวเช็คและส่ง error ออกมา
    // แต่ mysql validate constraint ได้ไม่เยอะ sequelize เลยมี tool เอาไว้ validate สิ่งที่ mysql validate ไม่ได้ เรียกว่า Validations&Constraints

    // id สามารถละได้ ถ้าไม่เขียน ตอนสั่ง run method defined มันจะวิ่งไป map ที่ col id ในตารางให้เลย
    // id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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

// Todos.findAll().then((res) => console.log(JSON.stringify(res, null, 2)));
// Todos.create({ title: "#$&abcd", userId: 2 }).then((res) =>
//   console.log(JSON.stringify(res, null, 2))
// );

// การ defined หรือการกำหนด ความสัมพันธ์ระหว่าง Model (ต้องกำหนด เพราะที่ database แค่มี FK ตารางจะรู้ความสัมพันธ์กันแล้ว แต่ใน Model ถ้าไม่เขียน code ที่ defined ถึงความสัมพันธ์ระหว่าง Model มันจะไม่รู้)
// ใน 2 Model นี้ User มีความสัมพันธ์กับ Todos เป็น 1 to many และ Todos มีเจ้าของได้แค่ User เดียว  เป็น 1 to 1 ให้ดูจาก FK ฝั่งที่เป็น has ต้องไม่มี FK แต่ฝั่ง belongsTo ต้องมี FK
User.hasMany(Todos, { foreignKey: "userId" }); // User มีความสัมพันธ์กับ Todos ผ่าน col ชื่อ userId ที่เป็น foreignKey ดังนั้น จะทำให้ Model User นี้มี property เพิ่มขึ้นมาอันนึงคือ property Todos ซึ่งมันจะยังไม่แสดงออกมา
Todos.belongsTo(User, { foreignKey: "userId" }); // มีความสัมพันธ์เป็นคู่กันเลยใช้ FK เดียวกัน และมันจะทำให้ Model Todos นี้มี property เพิ่มขึ้นมาอันนึงคือ property User ซึ่งมันจะยังไม่แสดงออกมา

// ให้ใช้ include ในการแสดงข้อมูล property Todos ที่ซ่อนอยู่
// การใช้ inculde จะเสมือนสั่งให้มัน JOIN Table ที่มีความสัมพันธ์กัน ซึ่งต้องไปกำหนดความสัมพันธ์ก่อนถึงจะ JOIN ได้ เรียกวิธีนี้ว่า Eager loading
// User.findAll({ include: Todos })
//   .then((res) => console.log(JSON.stringify(res, null, 2)))
//   .catch((err) => console.log(err));
// ได้ res เป็น [{ id: 1, username: 'John', Todos: [ {id: 2, title: '', completed: '', userId: 1}, {} ] }, { id: 2, usename: '', Todos: [] }, {}, ...]

// ใช้ include ในการแสดงข้อมูล property User ที่ซ่อนอยู่
// Todos.findAll({ include: User })
//   .then((res) => console.log(JSON.stringify(res, null, 2)))
//   .catch((err) => console.log(err));

Todos.findAll({
  attributes: {
    exclude: ["userId", "completed"], // attributes นี้อยู่ชั้นเดียวกับ Model Todos ดังนั้น col ที่กำหนดใน attributes นี้จะเป็น col ใน Todos
  },
  include: {
    model: User,
    attributes: ["username"], // attributes นี้อยู่ชั้นเดียวกับ Model User ดังนั้น col ที่กำหนดใน attributes นี้จะเป็น col ใน User
  },
})
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.log(err));

//  ถ้าความสัมพันธ์เป็นแบบ Many to Many ต้องมีตารางกลาง หรือ Model กลางเพิ่มขึ้นมาเชื่อมความสัมพันธ์ และจะใช้แค่ belongsToMany() เช่น A.belongsToMany(B, { through: C, Options })
