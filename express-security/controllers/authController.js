const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password is not match" });
    }

    // const user = User.build({ username, email });
    // console.log(user); // User { dataValues: { id: null, username: 'jacky', email: 'jacky@gmail.com' }, .... }

    const existUsername = await User.findOne({ where: { username: username } });
    if (existUsername) {
      return res
        .status(400)
        .json({ message: "This username has been already taken" });
    }

    const existEmail = await User.findOne({ where: { email: email } });
    if (existEmail) {
      return res.status(400).json({ message: "This email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    // การ validate ในชั้น Model จะเกิดขึ้นตอนที่เราสั่ง create
    await User.create({ username, email, password: hashed });
    //   { user: { id: , username: , password: , Todo: [ { id: , title: , completed: }, {} ] } }
    res.status(201).json({ message: "user created", username, email });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existUsername = await User.findOne({
      where: { username },
      // attributes: ["username", "password"],
    });
    // ถ้าพิมพ์ username มาผิด existUsername จะมีค่าเป็น null แต่ถ้าพิมพ์ค่าที่มีในตารางมาจะได้ { username: 'jacky', password: '$2a$10$dJWDcIQ/1th.ABEApRTp.e8KFT8lOFYaWicPr4rpqKhahIReWyUTS'}
    // console.log(existUsername);
    // console.log(existUsername.username); // john ถ้าส่งมาถูก
    const isPasswordMatch = await bcrypt.compare(
      password,
      existUsername ? existUsername.password : ""
    );

    if (!existUsername) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    } else if (!isPasswordMatch) {
      return res.status(400).json({ message: "You put wrong password" });
    }

    const payload = {
      id: existUsername.id,
      username,
      email: existUsername.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRETE_KEY, {
      // expiresIn: "30days",
      expiresIn: 60 * 60 * 24 * 30, // 60 คือ 60s * 60 คือ 1 ชม. มี 60 นาที * 24 คือ 1วัน มี 24 ชม. * 30 คือ 30 วัน
    });

    // const verify = jwt.verify(token, "login");
    // console.log(verify);

    // เฉลย
    // if (!existUsername) {
    //   return res
    //     .status(400)
    //     .json({ message: "username or password is incorrect" });
    // }
    // const isMatch = await bcrypt.compare(password, existUsername.password);
    // if (!isMatch) {
    //   return res
    //     .status(400)
    //     .json({ message: "username or password is incorrect" });
    // }

    res.status(200).json({ message: "user login", token });
  } catch (err) {
    next(err);
  }
};

// ถ้าไม่อยากเขียนตรวจสอบเองให้ใช้ passport แทนการเขียนแบบนี้ก็ได้
exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthenticate" });
    }
    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthenticate" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    // req.payload = payload; แบบนี้ไม่ดีเพราะ เกิดการเปลีี่ยนแปลงข้อมูลได้ เช่น ข้อมูลใน user ถูกลบออกจาก db แต่ token ยังอยู่

    const user = await User.findOne({ where: { id: payload.id } });
    // ปกติต้อง check payload ของ token นี้ก่อนว่ายังใช้ได้อยู่ไหม โดยการเพิ่ม col บันทึกการเปลี่ยน password แล้วเอามาเทียบกับ iat(เวลาที่สร้าง token) ของ token นี้ พอเทียบเสร็จถ้า token นี้ใช้ไม่ได้ต้องส่ง message ไปบอกว่า token นี้หมดอายุแล้ว แต่ถ้าใช้ได้ให้ไป select ข้อมูลใน db มา
    // if(user.iat * 1000 < new Date(user.lastUpdatePassword).getTime()) return res.status(401).json({ message: "Unauthenticate" })

    // พอ select ข้อมูลใน db มาเสร็จ ต้องเอามา check ว่า ข้อมูล user นี้ยังอยู่ใน db มั้ยก่อนที่จะส่งข้อมูลเข้าไปใน req เพราะ เกิดการเปลีี่ยนแปลงข้อมูลได้ตลอด เช่น ข้อมูลใน user ถูกลบออกจาก db แต่ token ยังอยู่
    if (!user) return res.status(401).json({ message: "Unauthenticate" });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { email, password, newPassword, confirmPassword } = req.body;
    const isMatch = bcrypt.compare(password, req.user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "password is not match" });
    }
    const hashed = bcrypt.hash(newPassword, 10);
    await User.update({ email, hashed }, { where: { id: req.user.id } });
    res.status(200).json({ message: "user updated successfully" });
  } catch (err) {
    next(err);
  }
};
