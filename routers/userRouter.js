const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const utils = require("../utils.js");

const userRouter = express.Router();

// user-create
userRouter.post("/create", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (username.length > 0 && password === confirmPassword) {
    const newUser = new UserModel({
      username: username,
      hashedPassword: utils.hashPassword(password),
    });
    await newUser.save();
    res.redirect("/");
  } else {
    res.status(401).send("fel på inmatad data");
  }
});

//Login
userRouter.get("/login", (req, res) => {
  res.render("login");
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username }, (err, user) => {
    if (user && utils.comparePassword(password, user.hashedPassword)) {
      const userData = {
        _id: user._id,
        username,
      };
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

      res.cookie("token", accessToken);
      res.redirect("/");
    } else {
      res.status(400).send("login failed");
    }
  });
});

//Logout
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = userRouter;
