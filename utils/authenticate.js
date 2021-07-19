const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

exports.certifyPassword = (requestPassword, storedPassword) => {
  return bcrypt.compare(requestPassword, storedPassword);
};

exports.encryptPassword = (password) => {
  return bcrypt.hash(password, 12);
};

exports.generateAccessToken = (information) => {
  return jwt.sign(information, secretKey, { expiresIn: "5h" });
};
