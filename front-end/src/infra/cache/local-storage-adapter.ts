import { SetStorage, GetStorage } from '../../data/protocols/cache'

export class LocalStorageSetAdapter implements SetStorage {
  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value)
  }
}

export class LocalStorageGetAdapter implements GetStorage {
  async get(key: string): Promise<string|null> {
    return localStorage.getItem(key)
  }
}
