import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../configs/constant-config';

import SubModel from '../entity/sub-entity';
import UserModel from '../entity/user-entity';

import { authenticate } from '../middleware/authenticate';

const router = express.Router()

// User join sub
router.post('/join', authenticate(), (req, res) => {
  // FIXME: User can join the same sub again, so the Sub ID will duplicate
  const joinedSubId = req.query.subId
  if (!joinedSubId) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  console.log(`joining sub ${joinedSubId}`)
  const decode: any = jwt.verify(req.headers.authorization, config.secretKey)
  const joiningUserId = decode.id
  UserModel.findById(joiningUserId).exec().then(joiningUser => {
    joiningUser.UserSub.push(joinedSubId)
    SubModel.findById(joinedSubId).exec().then(joinedSub => {
      joinedSub.SubUser.push(joiningUser._id)
      joinedSub.save()
      joiningUser.save()
      res.status(200).json({
        message: "joining sub completed",
        data: {}
      })
    })
  }).catch(err => {
    res.status(500).json({
      message: "joining failed",
    })
    console.log(err)
    return
  })
})

// User leave sub
router.post('/leave', authenticate(), (req, res) => {
  return res.status(500).json({
    message: "not implemented",
  });
})

export default router
