const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?teste=123
// Route params = /users/1

const users = ["Luiz", "Cláudio", "Victor"];

server.use((req, res, next) => {
  console.log(`Método ${req.method}; URL ${req.url}`);

  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User this not exists" });
  }

  return next();
}

server.get("/users", (req, res) => {
  res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  res.json(users);
});

server.put("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  res.json();
});

server.listen(3000);
