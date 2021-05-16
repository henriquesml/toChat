import { RemoteGetMessage } from '../../../../data/usecases/get-message/get-message'
import { GetMessage } from '../../../../domain/usecases'
import { makeGunMessage } from '../../message/gun-message-factory'

export const makeRemoteGetMessage = (): GetMessage => {
  return new RemoteGetMessage(makeGunMessage())
}
