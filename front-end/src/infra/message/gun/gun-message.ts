import Gun from 'gun'
import { SendMessageClient, SendMessageClientParams, GetMessageClient, GetMessageClientReturn } from '../../../data/protocols/message'
const gun = Gun({
  peers: [
    'http://localhost:3333/gun'
  ]
})
export class GunMessage implements SendMessageClient, GetMessageClient {
  send(params: SendMessageClientParams): void {
    const { room, data } = params
    const messages: any = gun.get(room).get('messages')
    messages.set({
      author: data.author,
      message: data.message,
      createdAt: data.createdAt
    })
  }

  get(room: string): GetMessageClientReturn {
    return gun.get(room).get('messages')
  }
}
