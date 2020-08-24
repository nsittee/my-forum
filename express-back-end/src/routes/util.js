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
    subs: [],
    users: [],
    threads: []
  }

  // Create Sub Reddit
  const subNumber = Math.floor(Math.random() * 1000) + 1;
  const sub = new SubModel({
    SubLongName: `SubReddit ${subNumber}`,
    SubShortName: `${subNumber}`
  });
  sub.save().then(newSub => {

    // Create User
    const userNumberRand = Math.random();
    const username = "test-user-" + userNumberRand;
    const user = new UserModel({
      Username: username,
      Password: "Pass",
      UserSub: [newSub._id]
    });
    response.users.push(user);
    newSub.SubUser.push(user._id);
    newSub.save();
    response.subs.push(newSub);
    user.save().then(newUser => {
      // Create Thread for User
      const threadPosted = Math.floor(Math.random() * 10) + 1;
      for (var i = 0; i < threadPosted; i++) {
        const thread = new ThreadModel({
          Title: `Story of ${username}, ${i + 1}/${threadPosted}`,
          Content: "Place Holder",
          Upvote: Math.floor(Math.random() * 1000) + 1,
          Downvote: Math.floor(Math.random() * 1000) + 1,
          CreatedDate: Date.now(),
          Author: newUser._id,
        });
        response.threads.push(thread);

        if (i == threadPosted - 1) {
          console.log('last thread');
          thread.save().then(newThread => {
            return res.status(200).json(response);
          }).catch(err => {
            console.log(err);
            return res.status(500).json(err);
          });
        } else thread.save();

        // Push new thread._id to 'user' and 'sub' then update
      }
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err);
  });
  // Create Comment for the above thread
});

async function addThread() {

}

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