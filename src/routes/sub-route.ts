import express from 'express'

import Sub from '../entity/sub-entity'
import { IxUser } from '../entity/user-entity'

import { authenticate } from '../middleware/authenticate'

const router = express.Router()

// User join sub
router.put('/join', authenticate(), async (req, res) => {
  const subId = req.query.subId as string
  const user = res.locals.currentUser as IxUser
  if (!subId) return res.status(400).json({ message: 'bad request' })

  try {
    const sub = await Sub.findById(subId).exec()

    if ((user.UserSub as string[]).includes(subId) // validate users joing the same sub
      || (sub.SubUser as string[]).includes(user._id)) {
      throw -1
    }
    user.UserSub.push(subId)
    sub.SubUser.push(user._id)
    sub.save()
    user.save()
  } catch (err) {
    return res.status(500).json({
      message: "joining failed",
    })
  }
  return res.status(200).json({
    message: "joining sub completed",
  })
})

// User leave sub
router.put('/leave', authenticate(), (req, res) => {
  return res.status(500).json({
    message: "not implemented",
  })
})

export default router
