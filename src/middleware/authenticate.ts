import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express'
import { config } from '../configs/config';

interface JwtData {
  id: string,
  username: string,
  iat: string,
  exp: string
}

export const authenticate: RequestHandler = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, config.secretKey)
    const decoded: any = jwt.decode(req.headers.authorization)

    res.locals.userId = decoded.id
    // TODO: check if the session is valid and the user exists in database
    // console.log(req.body.Thread)
  } catch {
    return res.status(401).json({
      message: "auth failed",
    });
  }
  next();
}