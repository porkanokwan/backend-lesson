const db = require("../models");

exports.createDepartment = async (req, res, next) => {
  try {
    const { name, buget } = req.body;
    const department = await db.Department.create({
      name,
      buget,
    });
    res.status(201).json({ department });
  } catch (err) {
    next(err);
  }
};

exports.getAllDepartment = async (req, res, next) => {
  try {
    const department = await db.Department.findAll();
    res.status(200).json({ department });
  } catch (err) {
    next(err);
  }
};

exports.getDepartmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const department = await db.Department.findAll({ where: { id } });
    res.status(200).json({ department });
  } catch (err) {
    next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
