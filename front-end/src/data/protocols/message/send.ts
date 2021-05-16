import { MessageModel } from '../../../domain/models'

export type SendMessageClientParams = {
  data: MessageModel,
  room: string
}

export interface SendMessageClient {
  send: (params: SendMessageClientParams) => void
}
