import { Router } from 'express'
import { UserController } from './user.controller'
import { validate } from '../middlewares/validate'
import { UserLoginSchema, UserRegisterSchema } from './user.dto'

const userRouter = Router()

const userController = new UserController()

userRouter.post(
  '/register',
  validate(UserRegisterSchema),
  userController.create,
)

userRouter.post('/login', validate(UserLoginSchema), userController.login)

export { userRouter }
