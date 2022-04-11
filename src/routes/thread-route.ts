import { getAllThread, applyVoteStatus, getOneThread, createNewThread, voteThread } from './../services/thread-service';
import express from 'express'
import mongoose, { LeanDocument } from 'mongoose'

import Thread, { IxThread } from '../entity/thread-entity'
import User, { IxUser } from '../entity/user-entity'
import Sub from '../entity/sub-entity'
import SubModel from '../entity/sub-entity'

import { authenticate } from '../middleware/authenticate'
import _ from 'lodash'

const router = express.Router()

// Mongoose query result is Mongoose Document Object, which is a readonly data
// calling `lean()` will turn it into JSON object will be editable
// https://stackoverflow.com/questions/14504385/why-cant-you-modify-the-data-returned-by-a-mongoose-query-ex-findbyid
router.get('/from-sub/:name?', authenticate(true), async (req, res) => {
  const subName = req.params.name
  const user = res.locals.currentUser as IxUser
  let threadList = [] as LeanDocument<IxThread>[]

  try {
    threadList = await getAllThread(subName)
    if (user) {
      applyVoteStatus(threadList, user)
    }

  } catch (err) {
    return res.status(500).json({
      message: `FAILED: get all thread for: ${subName ? subName : "all"}`,
      data: {
        SubThread: [],
      }
    })
  }

  return res.status(200).json({
    message: `OK: get all thread for: ${subName ? subName : "all"}`,
    data: {
      SubThread: threadList,
    }
  })
})

// Get detail for one thread
router.get('/:id', async (req, res, next) => {
  const threadId = req.params.id
  let thread: IxThread = null

  try {
    thread = await getOneThread(threadId)
  } catch (err) {
    return res.status(400).json({
      message: 'FAILED: get specific thread data',
      data: thread,
    })
  }

  return res.status(200).json({
    message: 'OK: get specific thread data',
    data: thread,
  })
})

// New thread
router.post('/', authenticate(), async (req, res, next) => {
  const reqThread = req.body.Thread
  let newThread: IxThread
  if (!reqThread) return res.status(400).json({ message: "invalid json" })

  try {
    const thread = new Thread({
      Title: reqThread.Title,
      Author: mongoose.Types.ObjectId(reqThread.Author._id),
      SubParent: mongoose.Types.ObjectId(reqThread.SubParent._id),
      Content: reqThread.Content
    })

    newThread = await createNewThread(thread)
  } catch (err) {
    res.status(500).json({
      message: "FAILED: saving thread error",
      data: null,
    })
  }
  res.status(200).json({
    message: "OK: create new thread completed",
    data: newThread
  })
})

// User vote on thread
router.put('/vote/:id/:vote', authenticate(), async (req, res) => {
  const userId = res.locals.currentUser._id
  const threadId = req.params.id
  const vote = req.params.vote
  if (vote !== 'up' && vote !== 'down') return res.send('invalid')

  const user = await User.findOne().where('_id', userId).exec()
  const thread = await Thread.findOne().where('_id').equals(threadId).exec()
  let updatedThread: IxThread

  try {
    updatedThread = await voteThread(user, thread, vote)
  } catch (err) {
    return res.status(500).json({
      message: "FAILED: vote process failed",
      data: null,
    })
  }

  return res.status(200).json({
    message: "OK: vote completed",
    data: {
      Upvote: updatedThread.Upvote,
      Downvote: updatedThread.Downvote,
    },
  })
})

export default router