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

// If token is provided in the header, it must be a valid token, otherwise, 401
// If token is missing, then the `opt` must be `true`
export const authenticate = (optional: boolean = false) => async (req, res, next): Promise<RequestHandler> => {
  const accessToken = req.headers.authorization as string
  const emptyToken = accessToken === undefined || accessToken === null || accessToken === ''

  if (emptyToken && optional) {
    next()
    return
  }
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
    return res.status(401).json({
      message: "auth failed",
    })
  }
  next()
}