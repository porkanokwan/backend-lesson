const pool = require("../db/connect");

// Create: Post '/'
// parameter: body { payee: '' , amount: '' , date: ''(format Date obj), comment: '' , categoryId: }
// response: 201 created { id: , payee: , amount: , date: ,comment: , categoryId: }
// 400 Bad request, 500 Internal server

exports.createTransaction = async (req, res, next) => {
  try {
    const { payee, amount, date, comment = null, categoryId } = req.body;
    const result = await pool.execute(
      `INSERT INTO transactions (payee, amount, date, comment, categoryId) VALUES (?,?,?,?,?)`,
      [payee, amount, date, comment ? comment : null, categoryId]
    );
    res.status(201).json({
      transaction: {
        id: result[0].insertId,
        payee,
        amount,
        date: new Date(date),
        comment: comment ? comment : null,
        categoryId,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await pool.execute(
      "SELECT t.id AS transactionId, t.payee, t.amount, t.date, t.comment, t.categoryId, c.type, c.name FROM transactions t LEFT JOIN categories c ON c.id = t.categoryId"
    );
    const obj = result[0].reduce((prev, cur) => {
      if (prev[cur.transactionId]) {
        prev[cur.transactionId].category = [
          ...prev[cur.transactionId].category,
        ];
      } else {
        prev[cur.transactionId] = {
          id: cur.transactionId,
          payee: cur.payee,
          amount: cur.amount,
          date: cur.date,
          comment: cur.comment,
          category: [
            {
              id: cur.categoryId,
              type: cur.type,
              name: cur.name,
            },
          ],
        };
      }
      return prev;
    }, {});
    res.status(200).json({ trasactions: Object.values(obj) }); // Object.values(obj) return เป็น Array
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { payee, amount, date, comment = null, categoryId } = req.body;
    const result = await pool.execute(
      "UPDATE transactions SET payee = ?, amount = ?, date = ?, comment = ?, categoryId = ? WHERE id = ?",
      [payee, amount, date, comment ? comment : null, categoryId, id]
    );
    if (result[0].changedRows === 0) {
      return res.status(400).json({ message: "id not found" });
    }
    res.status(200).json({
      transaction: {
        id,
        payee,
        amount,
        date,
        comment: comment ? comment : null,
        categoryId,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.execute("DELETE FROM transactions WHERE id = ?", [
      id,
    ]);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
