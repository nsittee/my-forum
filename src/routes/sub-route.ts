import express from 'express'

import { authenticate } from '../middleware/authenticate'
import { userJoinSub, userLeaveSub } from './../services/sub-service'
import { IxUser } from '../model/user-model'

const router = express.Router()

// User join sub
router.put('/join', authenticate(), async (req, res) => {
  const subId = req.query.subId as string
  const user = res.locals.currentUser as IxUser
  if (!subId) return res.status(400).json({ message: 'bad request' })

  try {
    await userJoinSub(subId, user)
  } catch (err) {
    if (err === -1) return res.status(400).json({
      message: "already a member",
    })
    else return res.status(500).json({
      message: "joining sub failed",
    })
  }
  return res.status(200).json({
    message: "joining sub completed",
  })
})

// User leave sub
router.put('/leave', authenticate(), async (req, res) => {
  const subId = req.query.subId as string
  const user = res.locals.currentUser as IxUser
  if (!subId) return res.status(400).json({ message: 'bad request' })

  try {
    await userLeaveSub(subId, user)
  } catch (err) {
    if (err === -1) return res.status(400).json({
      message: "already a left",
    })
    else return res.status(500).json({
      message: "leaving sub failed",
    })
  }
  return res.status(200).json({
    message: "leaving sub completed",
  })
})

export default router
