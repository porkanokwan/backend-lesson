const express = require("express");
const app = express();
const transactionsRoute = require("./routes/transactionRoute");
const categoryRoute = require("./routes/categoryRoute");

// Middle ware แกะ body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Resource : '/transactions' ของตาราง transactions และ '/categories' ของตาราง categories
// รูปแบบข้อมูล { id: transactions_id, payee: '', date: '', amount: '', comment: '', categoryId: { id: category_id, type: '', name: '' } }

// Middleware transactions route
app.use("/transactions", transactionsRoute);

// Middleware categories route
app.use("/categories", categoryRoute);

// Middleware resource
app.use((req, res, next) => {
  res.status(404).json({ message: "This resource not found in this server" });
});

app.use((req, res) =>
  res.status(404).json({ message: "Resource not found on this server" })
);

// Handle Error
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(8000, () => console.log("Server running on port 8000.."));
