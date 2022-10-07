const db = require("../models");

exports.createOrderItem = async (req, res, next) => {
  try {
    const { amount, price, discount, orderId, productId } = req.body;
    const orderItem = await db.OrderItem.create({
      amount,
      price,
      discount,
      orderId,
      productId,
    });
    res.status(201).json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrderItem = async (req, res, next) => {
  try {
    const orderItem = await db.OrderItem.findAll();
    res.status(200).json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderItem = await db.OrderItem.findAll({ where: { id } });
    res.status(200).json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
