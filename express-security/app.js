require("dotenv").config(); // ต้องใส่ไว้บนสุด และ defualt ที่มันจะไปเอาค่ามาคือ ในไฟล์ .env แต่ถ้าจะให้ไปเอาค่ามาจากไฟล์อื่นต้องใส่ option ลงใน config
require("./config/passport"); // การ require แบบ global ให้ไฟล์อื่นใช้งานต่อได้
const express = require("express");
const db = require("./models");
const authRoute = require("./routes/authRoute");
const todoRoute = require("./routes/todoRoute");
const cors = require("cors");
const AuthenWithPassportJWT = require("./passportJwt");

// console.log(process.env);
// console.log(process.env.JWT_SECRETE_KEY); // ได้ 'login' ออกมา

const app = express();

// cors เป็น middleware ต้วนึงที่ใช้บอกว่า อนุญาติให้มีการร้องขอข้อมูลข้าม domain ได้ ( allow ทุก req ที่เข้ามาจาก client แม้จะต่าง domain กัน )
app.use(cors());

// สร้างตารางใน mysql ผ่าน Model ที่เราสร้าง
// db.sequelize.sync();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
// app.use("/todos", todoRoute);
// ใช้ passport เพื่อบอกว่าก่อนจะทำอะไรกับ Todo ต้องมี token ก่อน
app.use("/todos", AuthenWithPassportJWT, todoRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  let code = 500;
  if (err.name === "JsonWebTokenError") {
    code = 401;
  }
  if (err.name === "TokenExpiredError") {
    code = 401;
  }
  if (process.env.NODE_ENV === "development") {
    res.status(code).json({ message: err.message });
  } else {
    res.status(code).json({ message: "Something wrong" });
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server run on port ${port}...`));
