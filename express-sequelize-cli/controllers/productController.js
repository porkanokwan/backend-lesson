const db = require("../models");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, quantity, supplierId } = req.body;
    const product = await db.Product.create({
      name,
      price,
      description,
      quantity,
      supplierId,
    });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    // const product = await db.Product.findAll();
    // เขียนแบบ Raw query (คือ raw sql กำหนดคำสั่ง sql เอง)
    const result = await db.sequelize.query("SELECT * FROM `products`");
    res.status(200).json({ result });
    // res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getByProductId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findAll({ where: { id } });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, quantity, supplierId } = req.body;
    const product = await db.Product.update(
      {
        name,
        price,
        description,
        quantity,
        supplierId,
      },
      { where: { id } }
    );
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
