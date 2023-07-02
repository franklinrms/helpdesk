import { Router } from 'express'
import { userRouter } from './user/user.routes'

const router = Router()

router.get('/', (_req, res) => res.json({ message: 'Hello World' }))

router.use('/', userRouter)

export default router
