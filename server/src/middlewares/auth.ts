import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorTypes } from '../errors/catalog'
import { UserDto } from '../user/user.dto'

const SECRET = process.env.JWT_SECRET || 'jwt_secret'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) throw new Error(ErrorTypes.Unauthorized)

  try {
    const payload = jwt.verify(token, SECRET) as UserDto
    res.locals.user = payload
    next()
  } catch (err) {
    throw new Error(ErrorTypes.Unauthorized)
  }
}
