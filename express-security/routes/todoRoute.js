const express = require("express");
const {
  createTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const authController = require("../controllers/authController");

const router = express.Router();

// ก่อนจะทำอะไรกับ Todo ให้ตรวจสอบโดยใช้ authenticate ก่อน
// router.post("/", authController.authenticate, createTodo);
// router.get("/", authController.authenticate, getAllTodo);
// router.get("/", authController.authenticate, getTodoById);
// router.put("/:id", authController.authenticate, updateTodo);
// router.delete("/:id", authController.authenticate, deleteTodo);

// ใช้ passport
router.post("/", createTodo);
router.get("/", getAllTodo);
router.get("/", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
