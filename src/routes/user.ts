import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../configs/config';

import User from '../models/user';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res, next) => {
  const tokenData: any = jwt.decode(req.headers.authorization)
  User.findById(tokenData.id)
    .populate('UserSub', 'SubLongName')
    .exec().then(user => {
      res.status(200).json({
        message: 'get user success',
        data: user
      });
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
    // .populate('UserSub', 'SubLongName')
    .exec().then(userList => {
      console.log(userList)
      if (userList.length == 1) {
        const user = userList[0];
        bcrypt.compare(req.body.password, user.Password, (err, hashResult) => {
          if (err) return res.status(401).json({ message: "auth failed" });
          if (hashResult) {
            jwt.sign
            const token = jwt.sign({
              id: user._id,
              username: user.Username,
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

router.post('/sub-list', (req, res, next) => {
  const userId: any = jwt.decode(req.headers.authorization)
  User.findById(userId.id).exec().then(user => {
    console.log(user)
    res.status(200).json(user)
  })
})

export default router