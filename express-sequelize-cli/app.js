const express = require("express");
const customerRoute = require("./routes/customerRoute");
const productRoute = require("./routes/productRoute");
const supplierRoute = require("./routes/supplierRoute");
const orderRoute = require("./routes/orderRoute");
const employeeRoute = require("./routes/employeeRoute");
const departmentRoute = require("./routes/departmentRoute");
const orderItemRoute = require("./routes/orderItemRoute");

const app = express();

app.use(express.json());

app.use("/customers", customerRoute);
app.use("/products", productRoute);
app.use("/suppliers", supplierRoute);
app.use("/orders", orderRoute);
app.use("/employees", employeeRoute);
app.use("/departments", departmentRoute);
app.use("/orderItems", orderItemRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(8002, () => console.log("Server run on port 8002..."));
