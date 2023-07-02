import { Request, Response } from 'express'
import { UserService } from './user.service'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.userService.create(req.body)
    return res.status(201).json({ token: response })
  }
}
