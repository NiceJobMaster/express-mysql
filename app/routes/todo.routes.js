module.exports = app => {
  const todo = require("../controllers/todo.controller.js");

  app.post("/todo", todo.create);
  app.get("/todo", todo.findAll);
  app.get("/todo/:todoId", todo.findOne);
  app.put("/todo/:todoId", todo.update);
  app.delete("/todo/:todoId", todo.delete);
  app.delete("/todo", todo.deleteAll);
};
