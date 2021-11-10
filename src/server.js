const express = require("express");
const server = express();
const path = require("path");

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
server.use(express.static(__dirname + '/public'));

server.get("/", (req, res) => {
  res.render("index");
});

module.exports = server;
