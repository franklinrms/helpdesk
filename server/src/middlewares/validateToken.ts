import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';
import { IUser } from '../User/user.interfaces';


const SECRET = process.env.JWT_SECRET ?? 'jwt_secret';

const validateToken = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.headers.authorization ?? '';

  if (token.length === 0) throw new Error(ErrorTypes.TokenNotFound);

  try {
    const payload = jwt.verify(token, SECRET) as IUser;
    res.locals.user = payload;
    next();
  } catch (error) {
    throw new Error(ErrorTypes.TokenNotFound);
  }
};

export default validateToken;
