import { Request, Response } from 'express'
import type { UserService } from './user.service'

export class UserController {
  constructor(private service: UserService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.createUser(req.body)
    return res.status(201).json(response)
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.findUser(req.body)
    return res.status(200).json(response)
  }
}
