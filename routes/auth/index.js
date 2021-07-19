const express = require("express");
const auth = express.Router();
const controller = require("./controller");

auth.post("/register", controller.register);
auth.post("/login", controller.login);

module.exports = auth;
