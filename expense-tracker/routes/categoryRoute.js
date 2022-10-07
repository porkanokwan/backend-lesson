const express = require("express");
const {
  createCategory,
  getAll,
  deleteCategory,
  updateCategory,
  getById,
} = require("../controller/category");
const { validatorCategory } = require("../controller/validator");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", validatorCategory, createCategory);
router.put("/:id", validatorCategory, updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
