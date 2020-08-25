const express = require('express');
const app = express.Router();

const ThreadModel = require('../models/thread');
const UserModel = require('../models/user');
const SubModel = require('../models/sub');
const CommentModel = require('../models/comment');

app.get('/populate', (req, res) => {
  var response = {
    message: "populate",
  }

  // Create Sub Reddit
  const subNumber = Math.floor(Math.random() * 1000) + 1;
  const sub = new SubModel({
    SubLongName: `SubReddit ${subNumber}`,
    SubShortName: `${subNumber}`,
    SubUser: [],
    SubThread: [],
  });

  // Create User in this sub
  const userNumberRand = Math.random();
  const user = new UserModel({
    Username: `test-user-${userNumberRand}`,
    Password: "password",
    UserThread: [],
    UserSub: [],
  });
  sub.SubUser.push(user._id);
  user.UserSub.push(sub._id);

  // Create Thread for this user in this sub
  const num = Math.floor(Math.random() * 10) + 1;
  const threadCount = num % 10;
  const threads = [];
  for (var i = 0; i < threadCount; i++) {
    const thread = new ThreadModel({
      Title: `The story of ${user.Username}: Part ${i + 1}/${threadCount}`,
      Content: `Content ${num}`,
      Upvote: Math.floor(Math.random() * 1000) + 1,
      Downvote: Math.floor(Math.random() * 1000) + 1,

      Author: user._id,
      ThreadComment: [],
      SubParent: sub._id,
    });
    threads.push(thread);

    user.UserThread.push(thread);
    sub.SubThread.push(thread);
  }

  response.sub = sub;
  response.user = user;
  response.threads = threads;

  sub.save().then(
    user.save().then(
      threads.map(t => t.save())
    )
  )

  return res.status(200).json(response);
});

module.exports = app;