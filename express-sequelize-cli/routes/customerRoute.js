const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/", customerController.createCustomer);
router.get("/", customerController.getAllCustomer);
router.get("/:id", customerController.getByIdCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
