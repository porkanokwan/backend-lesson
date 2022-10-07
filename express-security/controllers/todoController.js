// สร้าง API สำหระบ todo
const jwt = require("jsonwebtoken");
const { Todo } = require("../models");

exports.createTodo = async (req, res, next) => {
  try {
    // ก่อนจะสร้าง todo ได้ ต้องยืนยันตัวตนก่อนว่าเป็นคนเดียวกับที่ login เข้ามามั้ย ใช้ token ตรวจสอบ และ user_id ไม่ควรรับเข้ามาใน body เพราะถ้ารับมาจะกลายเป็นว่าไม่ว่าใครก็ใส่ user_id แบบมั่วๆ ได้
    // ควรเอาข้อมูล user_id มาจาก token ที่ส่งเข้ามา เพราะ ใน token มันเก็บตัวตนของคนที่ส่งเข้ามา ดังนั้น ในฝั่งที่ส่ง req ต้องแนบ header authorization ที่มี token มาให้ด้วย
    const { title, completed } = req.body;
    // console.log(req.headers);
    // const { authorization } = req.headers; // ตอนส่ง req ต้องส่งสิ่งที่จะยืนยันตัวตนเข้ามาใน req.headers ผ่าน key ชื่อ authorization
    // if (!authorization || !authorization.startsWith("Bearer ")) {
    //   return res.status(401).json({ message: "Unauthenticate" });
    // }
    // const token = authorization.split(" ")[1];

    // if (!token) {
    //   return res.status(401).json({ message: "Unauthenticate" });
    // }

    // const payload = jwt.verify(token, "login");

    // const todo = await Todo.create({ title, completed, userId: payload.id });

    const todo = await Todo.create({ title, completed, userId: req.user.id });
    res.status(201).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    // ควรจะ select มาแค่ข้อมูลของ userId นั้น ที่ login เข้ามา
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findOne({ where: { id } });
    if (req.user.id !== todo.userId) {
      return res.status(400).json({ message: "This id is not in user" });
    }

    const [affectedRows] = await Todo.update(
      { title, completed },
      { where: { id } }
    );

    // เฉลย
    // const [affectedRows] = await Todo.update(
    //   { title, completed },
    //   { where: { id, userId: req.user.id } }
    // );

    if (affectedRows === 0)
      return res.status(400).json({ message: "cannot updated Todo" });

    // res.status(200).json({ todo: { id, title, completed } });
    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });
    if (!todo || req.user.id !== todo.userId) {
      return res.status(400).json({ message: "This id is not in user" });
    }

    const affectedRows = await Todo.destroy({
      where: { id },
    });
    if (affectedRows === 0) {
      return res.status(400).json({ message: "This id not found" });
    }

    // เฉลย
    // const [affectedRows] = await Todo.destroy({
    //   where: { id, userId: req.user.id },
    // });
    // if (affectedRows === 0) {
    //   return res.status(400).json({ message: "cannot delete Todo" });
    // }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
