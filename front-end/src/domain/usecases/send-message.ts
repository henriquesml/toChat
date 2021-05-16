export type SendMessageParams = {
  room: string
  author: string,
  message: string,
  createdAt: string
}

export interface SendMessage {
  send: (params: SendMessageParams) => void
}
