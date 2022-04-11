import express from 'express'
import mongoose, { LeanDocument } from 'mongoose'

import Thread, { IxThread } from '../entity/thread-entity'
import User, { IxUser } from '../entity/user-entity'
import Sub from '../entity/sub-entity'
import SubModel from '../entity/sub-entity';

import { authenticate } from '../middleware/authenticate'
import _ from 'lodash'

const router = express.Router();

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
      threadList = await Thread.find()
        .populate('Author', 'Username')
        .populate('SubParent', ['SubLongName', 'SubShortName'])
        .where({ SubParent: subId })
        .sort({ CreatedDate: -1 })
        .lean()
        .exec()
    } else {
      threadList = await Thread.find()
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

// Get detail for one thread
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

// New thread
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

// User vote on thread
router.put('/vote/:id/:vote', authenticate(), async (req, res) => {
  const userId = res.locals.userId
  const threadId = req.params.id
  const userVote = req.params.vote
  if (userVote !== 'up' && userVote !== 'down') return res.send('invalid')
  const user = await User.findOne().where('_id', userId).exec()

  const thread = await Thread.findOne().where('_id').equals(threadId).exec()
  if (userVote === 'up') {
    if ((user.UpvoteThread as string[]).includes(threadId)) {
      console.log('1 > 0')
      thread.Upvote = thread.Upvote - 1
      user.UpvoteThread = _.remove(user.UpvoteThread, (id: string) => id === threadId)
    }
    else if (user.DownvoteThread.includes(threadId)) {
      console.log('-1 > 1')
      thread.Downvote = thread.Downvote - 1
      thread.Upvote = thread.Upvote + 1
      user.UpvoteThread = user.UpvoteThread.concat([threadId])
      user.DownvoteThread = _.remove(user.DownvoteThread, (id: string) => id === threadId)
    }
    else {
      console.log('0 > 1')
      thread.Upvote = thread.Upvote + 1
      user.UpvoteThread = user.UpvoteThread.concat([threadId])
    }
  }
  else {
    if (user.DownvoteThread.includes(threadId)) {
      console.log('-1 > 0')
      thread.Downvote = thread.Downvote - 1
      user.DownvoteThread = _.remove(user.DownvoteThread, (id: string) => id === threadId)
    }
    else if (user.UpvoteThread.includes(threadId)) {
      console.log('1 > -1')
      thread.Downvote = thread.Downvote + 1
      thread.Upvote = thread.Upvote - 1
      user.DownvoteThread = user.DownvoteThread.concat([threadId])
      user.UpvoteThread = _.remove(user.UpvoteThread, (id: string) => id === threadId)
    }
    else {
      console.log('0 > -1')
      thread.Downvote = thread.Downvote + 1
      user.DownvoteThread = user.DownvoteThread.concat([threadId])
    }
  }

  user.save()
  thread.save()
  res.json({
    Upvote: thread.Upvote,
    Downvote: thread.Downvote,
  })
})

export default router