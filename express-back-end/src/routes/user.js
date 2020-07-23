const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserModel = require('../models/user');

router.get('/', (req, res, next) => {
  UserModel.find().exec().then(users => {
    res.status(200).json(users);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  UserModel.find({ _id: id }).exec().then(user => {
    res.status(200).json({
      message: "found user",
      data: user,
    });
  }).catch(err => {
    res.status(400).json({
      message: "user not found",
      error: err,
    });
  });
});

router.post('/', (req, res, next) => {
  if (req.body.username == null || req.body.password == null) {
    res.status(400).json({ message: "invalid argument" });
    return;
  }
  var user = new UserModel({
    _id: mongoose.Types.ObjectId(),
    userName: req.body.username,
    userPassword: req.body.password,
  });
  user.save().then(newUser => {
    res.status(200).json({
      message: "created new user",
      data: newUser,
    });
  });
});

module.exports = router;