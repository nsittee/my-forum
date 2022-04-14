import { ErrorStatus } from './../middleware/error-handler'
import express from 'express'
import bcrypt from 'bcryptjs'

import { Thread } from '../model/thread-model'
import { User } from '../model/user-model'
import { Sub } from '../model/sub-model'

const router = express.Router();

// To generate user, sub and thread data
// early return to not accidentally call the api
router.get('/populate', (req, res) => {
  return
  var response: any = {
    message: "populate",
  }

  // Create Sub Reddit
  const subNumber = Math.floor(Math.random() * 1000) + 1
  const sub = new Sub({
    SubLongName: `sub-reddit-${subNumber}`,
    SubShortName: `${subNumber}`,
    SubUser: [],
    SubThread: [],
  });

  // Create User in this sub
  const userNumberRand = Math.random();
  const user = new User({
    Username: `test-user-${userNumberRand}`,
    Password: bcrypt.hashSync('passwordXD', 10),
    UserThread: [],
    UserSub: [],
  });
  sub.SubUser.push(user._id)
  user.UserSub.push(sub._id)

  // Create Thread for this user in this sub
  const num = Math.floor(Math.random() * 10) + 1;
  const threadCount = num % 10;
  const threads = [];
  for (var i = 0; i < threadCount; i++) {
    const thread = new Thread({
      Title: `The story of ${user.Username}: Part ${i + 1}/${threadCount}`,
      Content: `Content ${num}`,
      Upvote: Math.floor(Math.random() * 1000) + 1,
      Downvote: Math.floor(Math.random() * 1000) + 1,

      Author: user._id,
      ThreadComment: [],
      SubParent: sub._id,
    });
    threads.push(thread)

    user.UserThread.push(thread)
    sub.SubThread.push(thread)
  }

  response.sub = sub
  response.user = user
  response.threads = threads

  // Before adding ts interface
  // sub.save().then(
  //   user.save().then(
  //     threads.map(t => t.save())
  //   )
  // )
  sub.save().then(subRes => {
    user.save().then(userRes => {
      threads.map(t => t.save())
    })
  })


  return res.status(200).json(response);
});

router.get('/debug', async (req, res, next) => {
  const username = 'test-user-0.07546525770485024'
  const user = await User.findOne().where({ Username: username }).exec()
  const userList = await User.find().exec()

  console.log(user)

  res.status(200).json({
    user: user,
    userList: userList,
  })
})

router.get('/error', async (req, res, next) => {
  const errorStatus: ErrorStatus = {
    message: 'debug error',
    status: 500,
  }
  return next(errorStatus)
})

module.exports = router;
export default router