const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');

const ThreadModel = require('../models/thread');
const UserModel = require('../models/user');

app.get('/init', (req, res) => {
  const userNumberRand = Math.random();
  const num = Math.floor(Math.random() * 10) + 1;
  var newUser = new UserModel({
    // _id: mongoose.Types.ObjectId,
    userName: "testUser" + userNumberRand,
    userPassword: "password"
  });
  newUser.save().then(currentUser => {
    var _posterId = mongoose.mongo.ObjectId(currentUser._id);
    const threadCount = num % 10;
    console.log(`${newUser.userName} posted ${threadCount} thread(s)`);
    for (let i = 0; i < threadCount; i++) {
      const upVoteCount = Math.floor(Math.random() * 1000) + 1;
      const downVoteCount = Math.floor(Math.random() * 1000) + 1;
      var newThread = new ThreadModel({
        // _id: mongoose.Types.ObjectId,
        threadTitle: `The story of ${newUser.userName}: Part ${i + 1}/${threadCount}`,
        threadPoster: currentUser._id,
        subRedditId: 0,
        subReddit: "TIFU",
        content: `Content ${num}`,
        author: "Author",
        published: {
          date: "2020-06-12",
          time: "08:30:25"
        },
        upVote: upVoteCount,
        downVote: downVoteCount,
        comments: [1, 2, 3]
      });

      newThread.save().then(newThread => {
        var _threadId = newThread._id;
        UserModel.findById(_posterId).exec().then(user => {
          user.userThread.push(_threadId);
          user.save().then(updatedUser => {
            if (i === threadCount - 1) {
              UserModel.findById(new mongoose.Types.ObjectId(updatedUser._id)).exec().then(x => {
                console.log(x);
                return res.status(200).json(x);
              }).catch(err => {
                console.log(err);
              });
            }
          });
        });
      });
    }
  });
});

module.exports = app;