const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateRegistration } = require("../models/user");

// Registering new User.
router.post("/", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already registered.");

  user = new User({
    email: req.body.email,
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .headers("x-auth-token", token)
    .send(_.pick(user, ["_id", "email", "username"]));
});

module.exports = router;
