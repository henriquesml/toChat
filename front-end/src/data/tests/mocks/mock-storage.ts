import { SetStorage, GetStorage } from '@/data/protocols/cache'

export class SetStorageMock implements SetStorage {
  key!: string
  value: any
  async set(key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}

export class GetStorageMock implements GetStorage {
  key!: string
  async get(key: string): Promise<string|null> {
    this.key = key
    return 'value'
  }
}
