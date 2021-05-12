import { UserModel } from '../../../domain/models'
import { GetCurrentUser } from '../../../domain/usecases'
import { GetStorage } from '../../protocols/cache'

export class LocalGetCurrentUser implements GetCurrentUser {
  constructor(private readonly getStorage: GetStorage) {}

  async get(): Promise<UserModel> {
    const id = await this.getStorage.get('id')
    const username = await this.getStorage.get('username')
    return {
      id: id || '',
      username: username || ''
    }
  }
}
