const pool = require("../db/connect");

exports.createUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    // const result = await pool.query(
    //   `INSERT INTO user (username) VALUE ("${username}")` // การใส่ตัวแปรหรือค่าอะไรก็ตามเข้ามาในตัวแปรที่เราคาดไม่ถึงอาจทำให้เกิด sql injection ได้ พอเอา sql statement ไป execute อาจมีปัญหาได้ แก้โดยใช้ prepare statement
    // );
    const result = await pool.execute(`INSERT INTO user (username) VALUE (?)`, [
      username,
    ]); // ค่าใน username จะแทนที่เครื่องหมาย ? ได้เมื่อค่าถูกต้อง
    res.status(200).json({
      message: "Create user",
      user: { id: result[0].insertId, username },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  // SELECT * FROM user
  try {
    const result = await pool.execute(
      "SELECT u.id AS user_id, u.username, t.id AS todo_id,t.title, t.completed FROM user u LEFT JOIN todos t ON t.user_id = u.id"
    );
    // console.log(result);

    /* ค่าที่ต้องการให้แสดงหลังจาก select มา
      [
        { id: user_id, username: '', todos: [ {id: todo_id, title: 'Meeting', completed: false }, {id: todo_id, title: 'Shopping', completed: true} ] }, 
        {}
      ]
    */
    const obj = result[0].reduce((acc, item) => {
      if (acc[item.user_id]) {
        acc[item.user_id].todos = [
          ...acc[item.user_id].todos,
          { id: item.todo_id, title: item.title, completed: item.completed },
        ];
      } else {
        acc[item.user_id] = {
          id: item.user_id,
          username: item.username,
          todos: [],
        };
        if (item.todo_id) {
          acc[item.user_id].todos = [
            { id: item.todo_id, title: item.title, completed: item.completed },
          ];
        }
      }
      return acc;
    }, {});
    // console.log(obj); // { '1': {id: 1, username: 'John', todos: [ [Object], [Object] ]}, '2' : {} }
    res.status(200).json({ users: Object.values(obj) });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [user] = await pool.execute("SELECT * FROM user WHERE id = (?)", [
      id,
    ]);
    // console.log(user); // [ { id: 3, username: 'Ally' } ]
    res.status(200).json({ user: user.length ? user[0] : null });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const params = req.params;
    const result = await pool.execute("DELETE FROM user WHERE id = (?)", [
      params.id,
    ]);
    if (result[0].affectedRows === 0) {
      return res.status(400).json({ message: "id not found" });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
