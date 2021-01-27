const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("user", userSchema);

function validateRegistration(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullname: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
  });

  return schema.validate({
    email: user.email,
    fullname: user.fullname,
    username: user.username,
    password: user.password,
  });
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate({
    email: user.email,
    password: user.password,
  });
}

module.exports.User = User;
module.exports.validateLogin = validateLogin;
module.exports.validateRegistration = validateRegistration;
