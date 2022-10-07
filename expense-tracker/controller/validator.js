const validator = require("validator");

exports.validatorCategory = async (req, res, next) => {
  try {
    const { type, name } = req.body;
    console.log(type);
    if (validator.isEmpty(type)) {
      return res.status(400).json({ message: "type is requried" });
    }
    if (typeof type !== "string") {
      return res.status(400).json({ message: "type must be string" });
    }
    if (validator.isEmpty(name)) {
      return res.status(400).json({ message: "name is requried" });
    }
    if (typeof name !== "string") {
      return res.status(400).json({ message: "name must be string" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.validatorTransactions = async (req, res, next) => {
  try {
    const { payee, amount, comment, date, categoryId } = req.body;
    if (validator.isEmpty(payee)) {
      return res.status(400).json({ message: "payee is requried" });
    }
    if (typeof payee != "string") {
      return res.status(400).json({ message: "payee must be string" });
    }
    if (validator.isEmpty(amount)) {
      return res.status(400).json({ message: "amount is requried" });
    }
    if (!validator.isNumeric(amount)) {
      return res.status(400).json({ message: "amount must be number" });
    }
    if (typeof comment != "string") {
      return res.status(400).json({ message: "comment must be string" });
    }
    if (date !== null && !validator.isDate(date + "")) {
      return res.status(400).json({ message: "Invalid date" });
    }
    if (validator.isEmpty(categoryId)) {
      return res.status(400).json({ message: "categoryId is requried" });
    }
    if (!validator.isNumeric(categoryId)) {
      return res.status(400).json({ message: "categoryId must be number" });
    }
    next();
  } catch (err) {
    next(err);
  }
};
