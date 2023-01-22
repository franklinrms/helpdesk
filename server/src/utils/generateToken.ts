import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../User/user.interfaces';

const SECRET = process.env.JWT_SECRET ?? 'jwt_secret';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
};

const generateToken = (payload: IUser): string => (
  jwt.sign(payload, SECRET, jwtConfig)
);

export default generateToken;
