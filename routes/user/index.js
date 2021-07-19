const express = require("express");
const passport = require("passport");
const user = express.Router();
const controller = require("./controller");

user.get("/current", passport.authenticate("jwt", { session: false }), controller.current);

module.exports = user;
