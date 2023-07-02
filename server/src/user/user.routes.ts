import { Router } from 'express'
import { UserController } from './user.controller'
import { validate } from '../middlewares/validate'
import { UserRegisterSchema } from './user.dto'

const userRouter = Router()

const userController = new UserController()

userRouter.post(
  '/register',
  validate(UserRegisterSchema),
  userController.create,
)

export { userRouter }
