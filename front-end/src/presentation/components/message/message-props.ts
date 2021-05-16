import { MessageModel } from '@/domain/models'

export type MessageProps = {
  message: MessageModel
  currentUser: boolean
}
