import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express'
import { config } from '../configs/config';

import User from '../models/user'

interface JwtData {
  id: string,
  username: string,
  iat: string,
  exp: string
}

export const authenticate = (opt: boolean = false) => async (req, res, next): Promise<RequestHandler> => {
  const accessToken = req.headers.authorization
  const refreshToken = req.headers.authorizationx
  try {
    const token = accessToken.substring(7)
    jwt.verify(token, config.secretKey)
    const decoded: any = jwt.decode(token)
    res.locals.userId = decoded.id

    // TODO: check if the user exists in database
  } catch {
    // access token expired, validate refresh token if exists
    if (refreshToken) {
      console.log('regenerate access token')
      try {
        jwt.verify(refreshToken, config.secretKey)
        const decoded: any = jwt.decode(refreshToken)
        const userId = decoded.id
        const user = await User.findById({ _id: userId })
        const aToken = jwt.sign({ id: user._id, username: user.Username },
          config.secretKey, {
          expiresIn: config.accessTokenDuration
        })
        console.log(aToken)
        // res.set("Authorization", aToken)
        res.header("Authorization", aToken)
      } catch {
        return res.status(401).json({
          message: "auth failed",
        })
      }
    } else if (!opt) {
      return res.status(401).json({
        message: "auth failed",
      })
    }
  }
  next();
}