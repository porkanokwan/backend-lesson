const { Customer } = require("../models");

exports.createCustomer = async (req, res, next) => {
  try {
    const { name, address } = req.body;
    const customer = await Customer.create({ name, address });
    res.status(201).json({ customer });
  } catch (err) {
    next(err);
  }
};

exports.getAllCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({ customer });
  } catch (err) {
    next(err);
  }
};

exports.getByIdCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findAll({ where: { id } });
    res.status(200).json({ customer });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
