const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');

const Thread = require('../models/thread');
const User = require('../models/user');
const Sub = require('../models/sub');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Thread.findOne()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .where('_id', id)
    .exec()
    .then(thread => res.status(200).json(thread));
});

router.post('/', checkAuth, (req, res, next) => {
  const reqThread = req.body.Thread;
  if (!reqThread)
    return res.status(400).json({ message: "invalid json" });

  const thread = new Thread({
    Title: reqThread.Title,
    Author: mongoose.Types.ObjectId(reqThread.Author._id),
    SubParent: mongoose.Types.ObjectId(reqThread.SubParent._id),
    Content: reqThread.Content
  });

  User.findOne({ _id: reqThread.Author._id }).exec().then(user => {
    user.UserThread.push(thread._id);
    user.save();
  });

  Sub.findOne({ _id: reqThread.SubParent._id }).exec().then(sub => {
    sub.SubThread.push(thread._id);
    sub.save();
  });

  thread.save().then(newThread => {
    res.status(200).json({
      message: "create new thread completed",
      data: newThread
    });
  }).catch(err => {
    res.status(500).json({ message: "saving thread error" });
  });
});

module.exports = router;