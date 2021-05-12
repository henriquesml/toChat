import { SaveCurrentUser } from '../../../domain/usecases'
import { SetStorage } from '../../protocols/cache'

export class LocalSaveCurrentUser implements SaveCurrentUser {
  constructor(private readonly setStorage: SetStorage) {}

  async save(id: string, username: string): Promise<void> {
    await this.setStorage.set('id', id)
    await this.setStorage.set('username', username)
  }
}
