const db = require("../models");

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, address, salary, departmentId } = req.body;
    const employee = await db.Employee.create({
      name,
      address,
      salary,
      departmentId,
    });
    res.status(201).json({ employee });
  } catch (err) {
    next(err);
  }
};

exports.getAllEmployee = async (req, res, next) => {
  try {
    const employee = await db.Employee.findAll();
    res.status(200).json({ employee });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await db.Employee.findAll({ where: { id } });
    res.status(200).json({ employee });
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
