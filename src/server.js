const express = require("express");
const server = express();
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

let connection;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser("secret"));
server.use(session({ cookie: { maxAge: 60000 } }));
server.use(flash());

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
server.use(express.static(__dirname + "/public"));

server.get("/", (req, res) => {
  res.render("index");
});

server.post("/sql_manager", (req, res) => {
  const { host, user, password, database, port } = req.body;

  connection = mysql.createConnection({
    host: host,
    user: user,
    database: database,
    password: password,
    port: port,
  });

  connection.connect((err) => {
    if (err) {
      console.log(err);
      req.flash("error", "Error connecting to database!");
      res.redirect("/");
    } else {
      req.flash("success", "Connected to database");
      res.redirect("/sql_manager");
    }
  });
});

server.get("/sql_manager", (req, res) => {
  res.render("sql_manager");
});

server.post("/validate_sql", (req, res) => {
  const { sql } = req.body;

  connection.query(sql, (err, results) => {
    if (err) {
      req.flash("error", err.sqlMessage);
      res.redirect("/sql_manager");
    } else {
      if (results.length > 0) {
        req.flash("result", results);
      } else {
        req.flash("result", [
          {
            fieldCount: results.fieldCount,
            affectedRows: results.affectedRows,
            insertId: results.insertId,
            info: results.info,
            serverStatus: results.serverStatus,
            warningStatus: results.warningStatus,
          },
        ]);
        req.flash("info", "No legitimate result!");
      }

      res.redirect("/sql_manager");
    }
  });
});

module.exports = server;
