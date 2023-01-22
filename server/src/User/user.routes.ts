/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import userController from './user.controller';
// import inputValidator from '../middlewares/inputValidator';
import validateToken from '../middlewares/validateToken';

const userRoutes = Router();

userRoutes.post('/register', userController.create);
userRoutes.post('/login', userController.find);
userRoutes.get('/validate', validateToken, userController.validate);


export default userRoutes;
