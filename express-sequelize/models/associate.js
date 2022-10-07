// เป็นไฟล์ที่ใช้กำหนดหรือ defined ความสัมพันธ์ระหว่าง Model โดยจะต้อง Import Model เข้ามาทุกอันเพื่อมาสร้างความสัมพันธ์
const User = require("./User");
const Todos = require("./Todo");

User.hasMany(Todos, { foreignKey: "userId" });
Todos.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Todos };
