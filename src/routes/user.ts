import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { config } from '../configs/config'
import User from '../models/user'
import { authenticate } from '../middleware/authenticate'

const router = express.Router()

router.post('/refresh-token', authenticate(), (req, res, next) => {
  res.status(200).json({ message: "ok" })
})

router.get('/', authenticate(), (req, res, next) => {
  const userId = res.locals.userId
  User.findById(userId)
    .populate('UserSub', 'SubLongName')
    .exec().then(user => {
      res.status(200).json({
        message: 'get user success',
        data: user
      });
    }).catch(err => {
      res.status(400).json(err);
    });
})

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
})

router.post('/signin', (req, res, next) => {
  User.find({ Username: req.body.username })
    // .populate('UserSub', 'SubLongName')
    .exec().then(userList => {
      if (userList.length == 1) {
        const user = userList[0]
        bcrypt.compare(req.body.password, user.Password, (err, hashResult) => {
          if (hashResult) {
            const aToken = jwt.sign({ id: user._id, username: user.Username },
              config.secretKey, {
              expiresIn: config.accessTokenDuration
            })
            const bToken = jwt.sign({ id: user._id },
              config.secretKey, {
              expiresIn: config.refreshTokenDuration
            })
            return res.status(200).json({
              message: "signin completed",
              data: {
                aToken: aToken,
                bToken: bToken
              },
            })
          } else {
            return res.status(401).json({ message: "username or password incorrect" })
          }
        })
      } else {
        return res.status(401).send({ message: "username or password incorrect" })
      }
    })
})

router.post('/sub-list', (req, res, next) => {
  const userId: any = jwt.decode(req.headers.authorization)
  User.findById(userId.id).exec().then(user => {
    console.log(user)
    res.status(200).json(user)
  })
})

export default router