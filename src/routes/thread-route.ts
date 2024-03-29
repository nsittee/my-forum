import { IxSub } from '../model/sub-model';
import { getAllThread, applyVoteStatus, getOneThread, createNewThread, voteThread, getSubFromId } from './../services/thread-service';
import express from 'express'
import { LeanDocument } from 'mongoose'

import { IxThread } from '../model/thread-model'
import { IxUser } from '../model/user-model'

import { authenticate } from '../middleware/authenticate'

const router = express.Router()

// Mongoose query result is Mongoose Document Object, which is a readonly data
// calling `lean()` will turn it into JSON object will be editable
// https://stackoverflow.com/questions/14504385/why-cant-you-modify-the-data-returned-by-a-mongoose-query-ex-findbyid
router.get('/from-sub/:name?', authenticate(true), async (req, res) => {
  const subName = req.params.name
  const user: IxUser = res.locals.currentUser
  let threadList: LeanDocument<IxThread>[] = []
  let sub: IxSub

  try {
    if (subName) sub = await getSubFromId(subName)
    threadList = await getAllThread(sub)
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
      _id: sub ? sub._id : '',
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
    newThread = await createNewThread(reqThread)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "FAILED: saving thread error",
      data: null,
    })
  }
  return res.status(200).json({
    message: "OK: create new thread completed",
    data: newThread
  })
})

// User vote on thread
router.put('/vote/:id/:vote', authenticate(), async (req, res) => {
  const user = res.locals.currentUser as IxUser
  const threadId = req.params.id
  const vote = req.params.vote
  if (vote !== 'up' && vote !== 'down') return res.send('invalid')

  let updatedThread: IxThread

  try {
    updatedThread = await voteThread(user, threadId, vote)
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