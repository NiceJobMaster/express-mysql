const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.set("port", process.env.port || PORT);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "welcome message" });
});

require("./app/routes/todo.routes.js")(app);
app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
