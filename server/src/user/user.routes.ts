import { Router } from 'express'
import prisma from '../lib/prisma/client'
import { UserController } from './user.controller'
import { validate } from '../middlewares/validate'
import { UserLoginSchema, UserRegisterSchema } from './user.dto'
import { UserService } from './user.service'

const userRouter = Router()

const userService = new UserService(prisma)
const userController = new UserController(userService)

userRouter.post(
  '/register',
  validate(UserRegisterSchema),
  userController.create,
)

userRouter.post('/login', validate(UserLoginSchema), userController.login)

export { userRouter }
