const express = require("express");
const {
  createTodo,
  deleteTodo,
  updateTodo,
  validateTodo,
  getAllToDo,
} = require("../controller/todoController");

const router = express.Router();

router.get("/", getAllToDo);
router.post("/", validateTodo, createTodo);
router.put("/:id", validateTodo, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
