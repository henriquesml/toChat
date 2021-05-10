import { Request, Response } from 'express'

export type ControllerReturn = Response<any, Record<string, any>>

export interface ControllerProtocol {
  create: (req: Request, res: Response) => Promise<ControllerReturn>
}
