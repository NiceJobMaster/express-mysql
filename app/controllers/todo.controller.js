const Todo = require("../models/todo.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req)

  const todo = {
  description: req.body.description,
  responsible: req.body.responsible,
  priority: req.body.priority,
  completed: req.body.completed,
  };

  Todo.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the todo."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Todo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Todo.findById(req.params.todoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found todo with id ${req.params.todoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving todo with id " + req.params.todoId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Todo.updateById(
    req.params.todoId,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found todo with id ${req.params.todoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating todo with id " + req.params.todoId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Todo.remove(req.params.todoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found todo with id ${req.params.todoId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete todo with id " + req.params.todoId
        });
      }
    } else res.send({ message: `todo was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Todo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all todos."
      });
    else res.send({ message: `All todos were deleted successfully!` });
  });
};
