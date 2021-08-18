import express from 'express'
import mongoose from 'mongoose'

import Thread from '../models/thread'
import User from '../models/user'
import Sub from '../models/sub'

import { authenticate } from '../middleware/authenticate'

const router = express.Router();

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Thread.findOne()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .where('_id', id)
    .exec()
    .then(thread => res.status(200).json({
      message: 'get specific thread data',
      data: thread
    }));
});

router.post('/', authenticate(), (req, res, next) => {
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

router.get('/vote/:id/:vote', authenticate(), async (req, res) => {
  const userId = res.locals.userId
  const threadId = req.params.id
  const userVote = req.params.vote
  if (userVote !== 'up' && userVote !== 'down') return res.send('invalid')

  const user = await User.findOne().where('_id', userId).exec()
  if (user.UpvoteThread.includes(threadId) || user.DownvoteThread.includes(threadId))
    return res.send('invalid')
  if (userVote === 'up') user.UpvoteThread = user.UpvoteThread.concat([threadId])
  else user.DownvoteThread = user.DownvoteThread.concat([threadId])

  const thread = await Thread.findOne().where('_id').equals(threadId).exec()
  if (userVote === 'up') thread.Upvote = thread.Upvote + 1
  else thread.Downvote = thread.Downvote + 1

  console.log(thread);

  user.save()
  thread.save()

  res.status(200)
})

export default router