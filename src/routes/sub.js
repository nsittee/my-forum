const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const SubModel = require('../models/sub')
const ThreadModel = require('../models/thread')
const UserModel = require('../models/user')

const checkAuth = require('../middleware/check-auth')

router.post('/join', checkAuth, (req, res) => {
  // FIXME: User can join the same sub again, so the Sub ID will duplicate
  const joinedSubId = req.query.subId
  if (!joinedSubId) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  console.log(`joining sub ${joinedSubId}`)
  const decode = jwt.verify(req.headers.authorization, config.secretKey)
  const joiningUserId = decode.id
  UserModel.findById(joiningUserId).exec().then(joiningUser => {
    joiningUser.UserSub.push(joinedSubId)
    SubModel.findById(joinedSubId).exec().then(joinedSub => {
      joinedSub.SubUser.push(joiningUser._id)
      joinedSub.save()
      joiningUser.save()
      res.status(200).json({
        message: "joining sub completed",
        data: {
          user: joiningUser,
          sub: joinedSub
        }
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

router.post('/leave', checkAuth, (req, res) => {
  res.status(400).json({
    message: "leaving sub completed",
  })
})

router.get('/:name', (req, res) => {
  const subName = req.params.name;
  SubModel.findOne()
    .where({ SubLongName: subName })
    .populate({
      path: 'SubThread',
      populate: [{
        path: 'Author',
        select: 'Username'
      }, {
        path: 'SubParent',
        select: ['SubLongName', 'SubShortName']
      }]
    })
    .exec()
    .then(sub => {
      res.status(200).send({
        message: 'get thread for sub completed',
        data: sub
      });
    });
});

router.get('/', (req, res, next) => {
  ThreadModel.find()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .exec()
    .then(threads => res.status(200).json({
      message: "get all thread",
      data: {
        SubThread: threads
      }
    }));
});

module.exports = router
