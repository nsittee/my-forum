import express from 'express'

import { authenticate } from '../middleware/authenticate'
import { signUpNewUser } from './../services/user-service'
import { User, IxUser } from '../model/user-model'

const router = express.Router()

router.get('/', authenticate(), (req, res, next) => {
  const user = res.locals.currentUser as IxUser;
  res.status(200).json({
    message: 'success: get user data',
    data: user,
  })
})

router.post('/signup', async (req, res, next) => {
  let resultUser: IxUser
  const username = req.body.username
  const password = req.body.password
  if (username == null || password == null)
    return res.status(400).json({ message: "invalid request" })

  try {
    const existingUser = await User.findOne().where({ Username: username }).exec()
    if (existingUser)
      return res.status(400).json({ message: "duplicate username" })

    resultUser = await signUpNewUser(username, password)
  } catch (err) {
    return res.status(500).json({
      message: "internal error during sign up"
    })
  }

  return res.status(200).json({
    message: "signup completed",
    data: {
      _id: resultUser._id,
      Username: resultUser.Username,
    }
  })
})

router.get('/joined-sub', authenticate(), async (req, res, next) => {
  const userId = (res.locals.currentUser as IxUser)._id
  const user = await User
    .findById(userId)
    .populate('UserSub', 'SubLongName')
    .exec()

  return res.status(200).json({
    message: 'success: get user data',
    data: {
      UserSub: user.UserSub
    },
  })
})

export default router