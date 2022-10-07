const express = require('express');
const router = express.Router();
const { createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo } = require('../controller/todoController');

// router ทำหน้าที่ dispatch แต่ละ path เข้าไปที่ controller ให้ controller ทำงาน ซึ่ง controller คือพวก method ที่อยู่ในแต่ละ route เช่น createTodo, getAllTodo เป็นต้น
router.post('/', createTodo);
router.get('/', getAllTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;