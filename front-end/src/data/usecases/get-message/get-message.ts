import { GetMessage, GetMessageParams } from '../../../domain/usecases'
import { GetMessageClient, GetMessageClientReturn } from '../../protocols/message'

export class RemoteGetMessage implements GetMessage {
  constructor(private readonly getetMessageClient: GetMessageClient) {}

  get(params: GetMessageParams): GetMessageClientReturn {
    const { room } = params
    return this.getetMessageClient.get(room)
  }
}
