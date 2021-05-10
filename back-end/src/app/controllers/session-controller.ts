import { Request, Response } from 'express'
import { ControllerProtocol, ControllerReturn } from './protocols'
import { SessionServiceProtocol } from '../services/protocols'

export class SessionController implements ControllerProtocol {
  constructor(private readonly sessionService: SessionServiceProtocol) {}

  async create(req: Request, res: Response): Promise<ControllerReturn> {
    const response = await this.sessionService.authUser(req.body)
    const { status, ...rest } = response
    return res.status(status).json({ ...rest })
  }
}
