import { LocalGetCurrentUser } from '../../../../data/usecases/get-current-user/local-get-current-user'
import { GetCurrentUser } from '../../../../domain/usecases'
import { makeLocalStorageGetAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalGetCurrentUser = (): GetCurrentUser => {
  return new LocalGetCurrentUser(makeLocalStorageGetAdapter())
}
