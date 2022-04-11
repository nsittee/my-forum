import { IxUser } from '../entity/user-entity';
import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../configs/constant-config';

import SubModel from '../entity/sub-entity';
import ThreadModel, { IxThread } from '../entity/thread-entity';
import UserModel from '../entity/user-entity';

import { authenticate } from '../middleware/authenticate';
import { LeanDocument } from 'mongoose';

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

// Mongoose query result is Mongoose Document Object, which is a readonly data
// calling `lean()` will turn it into JSON object will be editable
// https://stackoverflow.com/questions/14504385/why-cant-you-modify-the-data-returned-by-a-mongoose-query-ex-findbyid
router.get('/:name?', authenticate(true), async (req, res) => {
  let threadList = [] as LeanDocument<IxThread[]>;
  const subName = req.params.name;

  try {
    const user = res.locals.currentUser as IxUser;
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
        .lean()
        .exec()
    } else {
      threadList = await ThreadModel.find()
        .populate('Author', 'Username')
        .populate('SubParent', ['SubLongName', 'SubShortName'])
        .sort({ CreatedDate: -1 })
        .lean()
        .exec()
    }

    if (user) {
      threadList.forEach(thread => {
        if (user.UpvoteThread.map(_id => _id.toString()).includes(thread._id.toString())) thread.vote = 'up'
        else if (user.DownvoteThread.map(_id => _id.toString()).includes(thread._id.toString())) thread.vote = 'down'
      })
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
