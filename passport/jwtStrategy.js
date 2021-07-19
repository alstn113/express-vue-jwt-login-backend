const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async (payload, done) => {
  User.findOne({ where: { id: payload.id } })
    .then((user) => done(null, user))
    .catch((err) => done(err));
};

module.exports = () => {
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
