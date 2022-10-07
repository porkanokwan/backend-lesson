const pool = require("../db/connect");

// Create: Post '/'
// parameter: body { id: , type: , name: }
// 400 Bad request, 500 Internal server error
exports.createCategory = async (req, res, next) => {
  try {
    const { type, name } = req.body;
    const result = await pool.execute(
      "INSERT INTO categories (type, name) VALUE (?, ?)",
      [type, name]
    );
    if (result[0].affectedRows === 0) {
      return res.status(400).json({ message: "id not found" });
    }
    res
      .status(201)
      .json({ category: { id: result[0].insertId, type: type, name: name } });
  } catch (err) {
    next(err);
  }
};

// Read: GET '/categories/'
// parameter: -
// 400 Bad request, 500 Internal server error
exports.getAll = async (req, res, next) => {
  try {
    const result = await pool.execute(
      "SELECT c.id categoryId, c.type, c.name, t.id AS transactionId, t.payee, t.amount, t.date, t.comment FROM categories AS c LEFT JOIN transactions AS t ON c.id = t.categoryId"
    );
    const obj = result[0].reduce((prev, cur) => {
      if (prev[cur.type]) {
        prev[cur.type].transaction = [
          ...prev[cur.type].transaction,
          {
            category_id: cur.categoryId,
            category_name: cur.name,
            transactionId: cur.transactionId,
            payee: cur.payee,
            amount: cur.amount,
            date: cur.date,
            comment: cur.comment,
          },
        ];
      } else {
        prev[cur.type] = {
          transaction: [
            {
              category_id: cur.categoryId,
              category_name: cur.name,
              transactionId: cur.transactionId,
              payee: cur.payee,
              amount: cur.amount,
              date: cur.date,
              comment: cur.comment,
            },
          ],
        };
      }
      // ...prev,
      // [cur.type]: (prev[cur.type] || []).concat(cur),
      return prev;
    }, {});
    res.status(200).json({ category: obj });
  } catch (err) {
    next(err);
  }
};

// Read: GET '/categories/:id'
// parameter: params { id: value }
// 400 Bad request, 500 Internal server error
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [categories] = await pool.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

// Update: PUT '/categories/:id'
// parameter: params { id: value }, body { type, name }
// 400 Bad request, 500 Internal server error
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, name } = req.body;
    const result = await pool.execute(
      "UPDATE categories SET type = ?, name = ? WHERE id = ?",
      [type, name, id]
    );
    if (result[0].changedRows === 0) {
      return res.status(400).json({ message: "id not found" });
    }
    // console.log(result);
    res.status(200).json({ category: { id, type, name } });
  } catch (err) {
    next(err);
  }
};

// Delete: DELETE '/categories/:id'
// parameter: params { id: value }
// 400 Bad request, 500 Internal server error
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.execute("DELETE FROM categories WHERE id = ?", [
      id,
    ]);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
