const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getByOrderId);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
