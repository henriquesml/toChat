import { RemoteSendMessage } from '../../../../data/usecases/send-message/send-message'
import { SendMessage } from '../../../../domain/usecases'
import { makeGunMessage } from '../../message/gun-message-factory'

export const makeRemoteSendMessage = (): SendMessage => {
  return new RemoteSendMessage(makeGunMessage())
}
