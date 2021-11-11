const express = require("express");
const server = express();
const path = require("path");
const mysql = require("mysql2");

let connection;

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
server.use(express.static(__dirname + "/public"));

server.get("/", (req, res) => {
  res.render("index");
});

server.post("/connect", (req, res) => {
  if (req.body.password === "") {
    connection = mysql.createConnection({
      host: req.body.host,
      user: req.body.user,
      database: req.body.database,
    });
  } else {
    connection = mysql.createConnection({
      host: req.body.host,
      user: req.body.user,
      password: req.body.password,
      database: req.body.database,
    });
  }

  connection.connect((err) => {
    if (err) {
      res.render("index", {
        error: err,
      });
    } else {
      res.render("index", {
        success: "Connected to database",
      });
    }
  });
});

module.exports = server;
