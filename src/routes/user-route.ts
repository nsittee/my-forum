import { IxUser } from '../entity/user-entity';
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../entity/user-entity'
import { authenticate } from '../middleware/authenticate'

const router = express.Router()

router.get('/', authenticate(), (req, res, next) => {
  const user = res.locals.currentUser as IxUser;
  res.status(200).json({
    message: 'success: get user data',
    data: user,
  })
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

router.post('/sub-list', (req, res, next) => {
  const userId: any = jwt.decode(req.headers.authorization)
  User.findById(userId.id).exec().then(user => {
    console.log(user)
    res.status(200).json(user)
  })
})

export default router