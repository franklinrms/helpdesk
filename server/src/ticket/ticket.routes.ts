import { Router } from 'express'
import prisma from '../lib/prisma/client'
import { TicketController } from './ticket.controller'

import { TicketService } from './ticket.service'
import { validate } from '../middlewares/validate'
import { NewTicketSchema } from './ticket.dto'

const ticketRouter = Router()

const ticketService = new TicketService(prisma)
const ticketController = new TicketController(ticketService)

ticketRouter.post('/', validate(NewTicketSchema), ticketController.create)
ticketRouter.get('/', ticketController.findAll)

ticketRouter.patch('/:id/status', ticketController.updateStatus)

export { ticketRouter }
