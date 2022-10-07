const db = require("./models");
const { Customer } = require("./models");

// db.sequelize
//   .authenticate()
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log(err));

// method sync จะทำการดึงเอา Model ทุกตัวที่อยู่ใน db ไป sync ใน database แล้วดูว่ามี Table ชื่อนี้อยู่ไหม ถ้าไม่มีมันจะสร้างตารางใน database ผ่าน Model ที่ exports มา ซึ่งชื่อตารางจะมาจากชื่อ Model เติม s แต่ถ้ามีอยู่แล้วมันจะไม่สร้าง และมันจะทำการ sync Model ทุกตัวที่อยู่ใน db เข้ากับ table ใน database ให้อัตโนมัติ
// db.sequelize.sync();
// db.sequelize.sync({ force: true }); // sync มี option เป็น force ถ้าใส่ force จะเป็นการ drop table เก่า แล้วสร้างอันใหม่แทนทุกครั้งที่ save ดังนั้น ควรทำงานครั้งเดียว

const run = async () => {
  try {
    //   destructuring db แล้ว เรียก Model ใช้ได้เลย
    // const customer = await Customer.create({ name: "John" });
    // ไม่ได้ destructuring db ต้องเรียกใช้แบบนี้
    // const customer = await db.Customer.create({ name: "John" });
    // มันจะสั่งคำสั่ง INSERT INTO `Customers` (`id`,`name`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?); นี้ให้ลง database

    await Customer.update({ address: "Bangkok" }, { where: { id: 2 } });
    // จะได้ UPDATE `Customers` SET `address`=?,`updatedAt`=? WHERE `id` = ?
  } catch (err) {
    console.log(err);
  }
};

run();
