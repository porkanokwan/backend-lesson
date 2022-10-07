const { Customer, Order, OrderItem, Product, sequelize } = require("../models");

exports.createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { date, customerId, employeeId, orderItem } = req.body;
    const order = await Order.create(
      {
        date,
        customerId,
        employeeId,
      },
      { transaction: transaction }
    );
    const newOrderItem = orderItem.map((item) => ({
      ...item,
      orderId: order.id,
    }));
    await OrderItem.bulkCreate(newOrderItem, { transaction });
    // ถ้าคำสั่งใน transaction ทำงานสำเร็จทั้งหมดจะอนุญาตให้เอาข้อมูลนั้นลงในตาราง ใน database ได้
    await transaction.commit();

    // จะไป select ข้อมูลมาจาก table ได้
    const returnOrder = await Order.findOne({
      where: { id: order.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        { model: Customer, attributes: ["name"] },
        {
          model: OrderItem,
          attributes: ["price", "amount", "discount"],
          inculde: { model: Product, attributes: ["name"] },
        },
      ],
    });
    res.status(201).json({ order: returnOrder });
  } catch (err) {
    // ถ้าคำสั่งใน transaction ไม่สำเร็จจะข้ามมาเข้าอันนี้เลย
    await transaction.rollback();
    next(err);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await db.Order.findAll();
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.getByOrderId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await db.Order.findAll({ where: { id } });
    res.status(200).json({ returnOrder });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
