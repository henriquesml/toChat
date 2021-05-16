import { MessageModel } from '../models'

export type GetMessageParams = {
  room: string
}

export interface GetMessage {
  get: (params: GetMessageParams) => MessageModel[]
}
