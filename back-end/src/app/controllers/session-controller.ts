import { Request, Response } from 'express'
import { SessionService } from '../services'

export class SessinController {
  async create(req: Request, res: Response): Promise<any> {
    const response = await sessionService.authUser(req.body)
    const { status, ...rest } = response
    return res.status(status).json({ ...rest })
  }
}

const sessionService = new SessionService()
