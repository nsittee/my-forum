import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../configs/config';

import SubModel from '../models/sub';
import ThreadModel, { IxThread } from '../models/thread';
import UserModel from '../models/user';

import { authenticate } from '../middleware/authenticate';

const router = express.Router()

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

router.post('/leave', authenticate(), (req, res) => {
  res.status(400).json({
    message: "leaving sub completed",
  })
})

router.get('/:name?', authenticate(true), async (req, res) => {
  let threadList = [] as IxThread[];
  const userId = res.locals.userId;
  const subName = req.params.name;

  try {
    const subId = await SubModel
      .findOne()
      .where({ SubLongName: subName })
      .exec();

    if (subName) {
      threadList = await ThreadModel.find()
        .populate('Author', 'Username')
        .populate('SubParent', ['SubLongName', 'SubShortName'])
        .where({ SubParent: subId })
        .sort({ CreatedDate: -1 })
        .exec()
    } else {
      threadList = await ThreadModel.find()
        .populate('Author', 'Username')
        .populate('SubParent', ['SubLongName', 'SubShortName'])
        .sort({ CreatedDate: -1 })
        .exec()
    }
    // TODO: stamp the vote status if user is signed in
    if (userId) {

    }

  } catch (err) {
    return res.status(500).json({
      message: `failed: get all thread for: ${subName ? subName : "all"}`,
      data: {
        SubThread: [],
      }
    });
  } finally {
    return res.status(200).json({
      message: `successfully: get all thread for: ${subName ? subName : "all"}`,
      data: {
        SubThread: threadList,
      }
    });
  }
});

export default router
