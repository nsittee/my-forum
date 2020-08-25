const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');

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
      CreatedDate: Date.now(),

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





// app.get('/init', (req, res) => {
//   const userNumberRand = Math.random();
//   const num = Math.floor(Math.random() * 10) + 1;
//   var newUser = new UserModel({
//     _id: mongoose.Types.ObjectId(),
//     userName: "testUser" + userNumberRand,
//     userPassword: "password"
//   });
//   newUser.save().then(currentUser => {
//     var _posterId = mongoose.mongo.ObjectId(currentUser._id);
//     const threadCount = num % 10;
//     console.log(`${newUser.userName} posted ${threadCount} thread(s)`);
//     for (let i = 0; i < threadCount; i++) {
//       const upVoteCount = Math.floor(Math.random() * 1000) + 1;
//       const downVoteCount = Math.floor(Math.random() * 1000) + 1;
//       var newThread = new ThreadModel({
//         _id: mongoose.Types.ObjectId(),
//         threadTitle: `The story of ${newUser.userName}: Part ${i + 1}/${threadCount}`,
//         threadPoster: currentUser._id,
//         subRedditId: 0,
//         subReddit: "TIFU",
//         content: `Content ${num}`,
//         author: "Author",
//         published: {
//           date: "2020-06-12",
//           time: "08:30:25"
//         },
//         upVote: upVoteCount,
//         downVote: downVoteCount,
//         comments: [1, 2, 3]
//       });
//       newThread.save().then(newThread => {
//         var _threadId = newThread._id;
//         UserModel.findById(_posterId).exec().then(user => {
//           user.userThread.push(_threadId);
//           user.save().then(updatedUser => {
//             if (i === threadCount - 1) {
//               UserModel.findById(new mongoose.Types.ObjectId(updatedUser._id)).exec().then(x => {
//                 console.log(x);
//                 return res.status(200).json(x);
//               }).catch(err => {
//                 console.log(err);
//               });
//             }
//           });
//         });
//       });
//     }
//   });
// });

module.exports = app;