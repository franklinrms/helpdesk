import { Request, Response } from 'express'
import type { TicketService } from './ticket.service'
import { UserDto } from '../user/user.dto'
import { Status } from '@prisma/client'
import { ErrorTypes } from '../errors/catalog'

export class TicketController {
  constructor(private service: TicketService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals as { user: UserDto }

    await this.service.create(user.id, req.body)

    return res.sendStatus(201)
  }

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    // const {  } = req.query
    const response = await this.service.findAll()
    return res.status(200).json(response)
  }

  public updateStatus = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { user } = res.locals as { user: UserDto }
    const { id } = req.params
    const { status } = req.query

    if (user.role === 'USER') throw new Error(ErrorTypes.Unauthorized)

    if (!Object.values(Status).includes(status as Status)) {
      throw new Error(ErrorTypes.BadRequest)
    }

    await this.service.updateStatus(id, status as Status, user.id)

    return res.sendStatus(200)
  }
}
