const express = require("express");
const userRoute = require("./routes/userRoutes");
const todoRoute = require("./routes/todoRoute");

const app = express();

app.use(express.json());

// USER Route
app.use("/users", userRoute);

// TODO Route
app.use("/todos", todoRoute);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ message: err.message });
});

app.listen(8001, () => console.log("Server running on port 8001"));
