const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth')

router.get('/my-sub', checkAuth, (req, res, next) => {
  console.log('all good')
  res.status(200).send(`all good ${req.headers.authorization}`)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.find({ _id: id })
    .exec()
    .then(user => {
      res.status(200).json(user);
    }).catch(err => {
      res.status(400).json(err);
    });
});

router.post('/signup', (req, res, next) => {
  if (req.body.username == null || req.body.password == null) {
    res.status(400).json({ message: "invalid body" });
    return;
  }
  User.find({ Username: req.body.username }).exec().then(userList => {
    if (userList.length == 0) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).send({ message: "error with bcrypt" });
        } else {
          var user = new User({
            Username: req.body.username,
            Password: hash,
          });
          user.save().then(newUser => {
            res.status(200).json({
              message: "signup completed",
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

router.post('/signin', (req, res, next) => {
  User.find({ Username: req.body.username })
    .populate('UserSub', 'SubLongName')
    .exec().then(userList => {
      console.log(userList)
      if (userList.length == 1) {
        const user = userList[0];
        bcrypt.compare(req.body.password, user.Password, (err, hashResult) => {
          if (err) return res.status(401).json({ message: "auth failed" });
          if (hashResult) {
            const token = jwt.sign({
              id: user._id,
              username: user.Username,
              userSub: user.UserSub
            },
              config.secretKey, {
              expiresIn: "1h"
            });
            return res.status(200).json({
              message: "signin completed",
              token: token,
            });
          }
        });
      } else res.status(409).send({ message: "username or password incorrect" });
    });
})

module.exports = router;