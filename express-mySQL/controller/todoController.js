const pool = require("../db/connect");

exports.validateTodo = (req, res, next) => {
  const { title, completed, user_id } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }
  next();
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, user_id } = req.body;

    // ต้อง validate title, completed, user_id ก่อนว่ามีค่าไหม ก่อนที่จะ insert เข้าไปใน db แต่ถ้าไม่เขียน validate ก็ได้ จะให้ db เป็นตัว throw error ไปที่ error handle middleware
    const [{ insertId }] = await pool.execute(
      `INSERT INTO todos (title, completed, user_id) VALUE (?, ?, ?)`,
      [title, completed, user_id]
    );
    res.status(201).json({ todo: { id: insertId, title, completed, user_id } });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed, user_id } = req.body;
    // ต้อง Validate ข้อมูลก่อน Update ข้อมูลในตาราง
    const result = await pool.execute(
      "UPDATE todos SET title = ?, completed = ?, user_id = ? WHERE id = ?",
      [title, completed, user_id, id]
    );
    if (result[0].changedRows === 0) {
      return res.status(400).json({ message: "id not found" });
    }
    res.status(200).json({ todo: { id, title, completed, user_id } });
  } catch (err) {
    next(err);
  }
};

exports.getAllToDo = async (req, res, next) => {
  try {
    const [todos] = await pool.execute(
      // ใช้ * ไม่ได้เพราะ ถ้ามีชื่อ col ซ้ำกันมันจะเอา col ตัวท้ายมาทับแทนที่ตัวแรก
      `SELECT t.id todo_id, t.title, t.completed, u.id AS user_id, u.username FROM todos t JOIN user u ON u.id = t.user_id`
    );
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.execute("DELETE FROM todo WHERE id = (?) ", [id]);
    if (result[0].affectedRows === 0) {
      return res.status(400).json({ message: "id not found" });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
