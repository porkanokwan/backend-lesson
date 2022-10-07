const mysql = require("mysql2/promise");
// const conPromise = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "19051999Kanokwan",
//   database: "cc11_todo_list",
// });

// conPromise
//   .then((con) => {
//     console.log("Connect Success");
// const stm = `CREATE TABLE USER(
//     id INT AUTO_INCREMENT,
//     username VARCHAR(255) NOT NULL,
//     PRIMARY KEY (id)
// ) `;
// return con.query(stm);
// return con.query(
//   `INSERT INTO user (username) VALUES ('John'), ('Albert'), ('Micahel')`
// );
// return con.query(`UPDATE user SET username = 'Ally' WHERE id = 3`);
// return con.query("DELETE FROM user WHERE id = 2");
//     return con.query(`SELECT * FROM user WHERE id = 2`);
//   })
//   .then((result) => {
// สั่ง SELECT จะได้ result เป็น [ rows, feilds(column) ]
// สั่ง INSERT/ UPDATE/ DELETE จะได้ result เป็น [ resultHeader ] => affectedRows, insertId, changedRows(มีแค่ใน UPDATE)
// console.log(result);
//     console.log(result[1]);
//   })
//   .catch((err) => console.log(err.message));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "19051999Kanokwan",
  database: "cc11_todo_list",
});

pool.query(`SELECT * FROM user`).then((result) => {
  console.log(result);
});
