const db = require("../models");

exports.createSupplier = async (req, res, next) => {
  try {
    const { name, address, phoneNumber } = req.body;
    const supplier = await db.Supplier.create({
      name,
      address,
      phoneNumber,
    });
    res.status(201).json({ supplier });
  } catch (err) {
    next(err);
  }
};

exports.getAllSupplier = async (req, res, next) => {
  try {
    const supplier = await db.Supplier.findAll();
    res.status(200).json({ supplier });
  } catch (err) {
    next(err);
  }
};

exports.getBySupplierId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await db.Supplier.findAll({ where: { id } });
    res.status(200).json({ supplier });
  } catch (err) {
    next(err);
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
