import { Request, Response } from 'express'
import { ControllerProtocol, ControllerReturn } from './protocols'
import { UserServiceProtocol } from '../services/protocols'

export class UserController implements ControllerProtocol {
  constructor(private readonly userService: UserServiceProtocol) {}

  async create(req: Request, res: Response): Promise<ControllerReturn> {
    const response = await this.userService.createUser(req.body)
    return res.status(response.status).json({
      message: response.message
    })
  }
}
