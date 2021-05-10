import { Request, Response } from 'express'
import { UserService } from '../services'

export class UserController {
  async create(req: Request, res: Response): Promise<any> {
    const response = await UserService.createUser(req.body)
    return res.status(response.status).json({
      message: response.message
    })
  }
}

export default new UserController()
