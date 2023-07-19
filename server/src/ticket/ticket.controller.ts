import { Request, Response } from 'express'
import type { TicketService } from './ticket.service'
import { UserDto } from '../user/user.dto'
import { Status } from '@prisma/client'
import { ErrorTypes } from '../errors/catalog'
import { prepStream, sendEvent } from '../lib/sse'

export class TicketController {
  constructor(private service: TicketService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals as { user: UserDto }

    await this.service.create(user.id, req.body)

    return res.sendStatus(201)
  }

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    const { byUser } = req.query
    const { user } = res.locals as { user: UserDto }

    let response

    if (byUser) {
      response = await this.service.findByUser(user.id)
    } else {
      response = await this.service.findAll()
    }
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

  public subscribeEvents = (req: Request, res: Response) => {
    const { byUser } = req.query
    const { user } = res.locals as { user: UserDto }

    prepStream(res)

    if (byUser) {
      this.service.subscribeEventsByUser(user.id).forEach(({ event, data }) => {
        sendEvent(res, event, data)
      })
    } else {
      this.service.subscribeEvents().forEach(({ event, data }) => {
        sendEvent(res, event, data)
      })
    }
  }
}
