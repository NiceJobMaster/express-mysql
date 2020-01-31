const sql = require("./db.js");

const Todo = todo => {
  this.description = todo.description;
  this.responsible = todo.responsible;
  this.priority = todo.priority;
  this.completed = todo.completed;
};

Todo.create = (newTodo, result) => {
  sql.query('ALTER TABLE `todo` AUTO_INCREMENT = 1')
  sql.query("INSERT INTO todo SET ?", newTodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created todo: ", { id: res.insertId, ...newTodo });
    result(null, { id: res.insertId, ...newTodo });
  });
};

Todo.findById = (todoId, result) => {
  sql.query(`SELECT * FROM todo WHERE id = ${todoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found todo: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Todo.getAll = result => {
  sql.query("SELECT * FROM todo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todos: ", res);
    result(null, res);
  });
};

Todo.updateById = (id, todo, result) => {
  sql.query(
    "UPDATE todo SET description = ?, responsible = ?, priority = ?, completed = ? WHERE id = ?",
    [todo.description, todo.responsible, todo.priority, todo.completed, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated todo: ", { id: id, ...todo });
      result(null, { id: id, ...todo });
    }
  );
};

Todo.remove = (id, result) => {
  sql.query("DELETE FROM todo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted todo with id: ", id);
    result(null, res);
  });
};

Todo.removeAll = result => {
  sql.query("DELETE FROM todo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} todos`);
    result(null, res);
  });
};

module.exports = Todo;
