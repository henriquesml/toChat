import { GetCurrentUser, GetMessage, SendMessage } from '@/domain/usecases'

export type MainProps = {
  getMessage: GetMessage
  sendMessage: SendMessage
  getCurrentUser: GetCurrentUser
}

export type MessageType = {
  author: string
  message: string
  createdAt: string
}

export type State = {
  messages: MessageType[]
}
