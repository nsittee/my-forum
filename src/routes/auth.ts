import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { config } from '../configs/config'
import User from '../models/user'

const router = express.Router()

router.post('/refresh-token', async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, config.secretKey)

    const decoded: any = jwt.decode(refreshToken)
    const userId = decoded.id
    const user = await User.findById(userId)
    const newAccessToken = jwt.sign({ id: user._id, username: user.Username },
      config.secretKey, {
      expiresIn: config.accessTokenDuration
    })
    return res.status(200).json({
      message: "ok",
      data: newAccessToken,
    })
  } catch (err) {
    return res.status(401).json({
      message: "not ok",
      data: "refresh expired",
    })
  }
})

router.post('/signin', (req, res, next) => {
  User.find({ Username: req.body.username })
    // .populate('UserSub', 'SubLongName')
    .exec().then(userList => {
      if (userList.length == 1) {
        const user = userList[0]
        bcrypt.compare(req.body.password, user.Password, (err, hashResult) => {
          if (hashResult) {
            const aToken = jwt.sign({ id: user._id, username: user.Username },
              config.secretKey, {
              expiresIn: config.accessTokenDuration
            })
            const bToken = jwt.sign({ id: user._id },
              config.secretKey, {
              expiresIn: config.refreshTokenDuration
            })
            return res.status(200).json({
              message: "signin completed",
              data: {
                aToken: aToken,
                bToken: bToken
              },
            })
          } else {
            return res.status(401).json({ message: "username or password incorrect" })
          }
        })
      } else {
        return res.status(401).send({ message: "username or password incorrect" })
      }
    })
})

export default router