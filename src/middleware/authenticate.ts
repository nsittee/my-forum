import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express'
import { config } from '../configs/config';

interface JwtData {
  id: string,
  username: string,
  iat: string,
  exp: string
}

export const authenticate = (opt: boolean = false) => (req, res, next): RequestHandler => {
  try {
    const token = req.headers.authorization.substring(7)
    jwt.verify(token, config.secretKey)
    const decoded: any = jwt.decode(token)
    res.locals.userId = decoded.id

    // TODO: check if the user exists in database
  } catch {
    if (!opt)
      return res.status(401).json({
        message: "auth failed",
      });
  }
  next();
}