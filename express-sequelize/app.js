// const Todos = require("./models/Todo");
// const User = require("./models/User");
const { User, Todos } = require("./models/associate");

User.findAll({ include: Todos })
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.log(err));

Todos.findAll({ include: User })
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.log(err));
