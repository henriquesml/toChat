import { SetStorage, GetStorage } from '../../../data/protocols/cache'
import { LocalStorageSetAdapter, LocalStorageGetAdapter } from '../../../infra/cache/local-storage-adapter'

export const makeLocalStorageSetAdapter = (): SetStorage => {
  return new LocalStorageSetAdapter()
}

export const makeLocalStorageGetAdapter = (): GetStorage => {
  return new LocalStorageGetAdapter()
}
