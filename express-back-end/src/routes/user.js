const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const user = require('../models/user');

router.get('/', (req, res, next) => {
  User.find().exec().then(users => {
    res.status(200).json(users);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.find({ _id: id }).populate('userThread').exec().then(user => {
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

router.post('/login', (req, res, next) => {
  User.find({ userName: req.body.username }).exec().then(userList => {
    if (userList.length == 1) {
      const user = userList[0];
      console.log(user.userPassword);
      res.status(200).json({
        message: "login!!",
        data: user,
      });
    } else {
      res.status(409).send({ message: "error" });
    }
  });
})

router.post('/', (req, res, next) => {
  if (req.body.username == null || req.body.password == null) {
    res.status(400).json({ message: "invalid argument" });
    return;
  }
  User.find({ userName: req.body.username }).exec().then(userList => {
    if (userList.length == 0) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).send({ message: "error" });
        } else {
          var newUser = new User({
            _id: mongoose.Types.ObjectId(),
            userName: req.body.username,
            userPassword: hash,
          });
          newUser.save().then(newUser => {
            res.status(200).json({
              message: "created new user",
              data: newUser,
            });
          });
        }
      });
    } else {
      res.status(409).send({ message: "duplicate username" });
    }
  });


});

module.exports = router;