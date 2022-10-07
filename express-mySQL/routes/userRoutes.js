const express = require("express");
const userController = require("../controller/userController");
// userController = { getAllUser, getUserById, createUser, deleteUser }

const router = express.Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
