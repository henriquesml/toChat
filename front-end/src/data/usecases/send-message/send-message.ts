import { SendMessage, SendMessageParams } from '../../../domain/usecases'
import { SendMessageClient } from '../../protocols/message'

export class RemoteSendMessage implements SendMessage {
  constructor(private readonly sendMessageClient: SendMessageClient) {}

  send(params: SendMessageParams): void {
    const { room, author, message, createdAt } = params
    this.sendMessageClient.send(
      {
        data: {
          author: author,
          message: message,
          createdAt: createdAt
        },
        room: room
      }
    )
  }
}
