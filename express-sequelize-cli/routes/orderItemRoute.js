const express = require("express");
const orderItemController = require("../controllers/orderItemController");

const router = express.Router();

router.post("/", orderItemController.createOrderItem);
router.get("/", orderItemController.getAllOrderItem);
router.get("/:id", orderItemController.getOrderItemById);
router.put("/:id", orderItemController.updateOrderItem);
router.delete("/:id", orderItemController.deleteOrderItem);

module.exports = router;
