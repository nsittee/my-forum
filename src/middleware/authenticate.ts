import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { config } from '../configs/constant-config'
import { User } from '../model/user-model'

interface JwtData {
  id: string,
  username: string,
  iat: string,
  exp: string
}

export const authenticate = (opt: boolean = false) => async (req, res, next): Promise<RequestHandler> => {
  const accessToken = req.headers.authorization as string
  try {
    const token = accessToken.substring(7)
    jwt.verify(token, config.secretKey)
    const decoded: any = jwt.decode(token)
    const userId = decoded.id

    const currentUser = await User
      .findById(userId)
      .populate('UpvoteThread', '_id')
      .populate('DownvoteThread', '_id')
      .populate('UserSub', '_id')
      .populate('UserThread', '_id')
      .exec()

    res.locals.currentUser = currentUser
  } catch {
    if (!opt || accessToken) {
      return res.status(401).json({
        message: "auth failed",
      })
    }
  }
  next()
}