import { Request, Response } from 'express'
import { UserService } from './user.service'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.userService.createUser(req.body)
    return res.status(201).json(response)
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.userService.findUser(req.body)
    return res.status(200).json(response)
  }
}
