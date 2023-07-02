import jwt, { SignOptions } from 'jsonwebtoken'
import { UserDto } from '../user/user.dto'

const SECRET = process.env.JWT_SECRET || 'jwt_secret'

const jwtConfig: SignOptions = {
  expiresIn: '24h',
  algorithm: 'HS256',
}

export const generateToken = (payload: UserDto): string =>
  jwt.sign(payload, SECRET, jwtConfig)
