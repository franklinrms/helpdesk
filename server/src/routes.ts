import { Router } from 'express'
import { userRouter } from './user/user.routes'
import { ticketRouter } from './ticket/ticket.routes'
import { auth } from './middlewares/auth'

const router = Router()

router.get('/', (_req, res) => res.json({ message: 'Hello World' }))

router.use('/', userRouter)
router.use('/ticket', auth, ticketRouter)

export default router
