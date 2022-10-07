const express = require("express");
const {
  createTransaction,
  getAll,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transactions");
const { validatorTransactions } = require("../controller/validator");

const router = express.Router();

router.post("/", validatorTransactions, createTransaction);
router.get("/", getAll);
router.put("/:id", validatorTransactions, updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
