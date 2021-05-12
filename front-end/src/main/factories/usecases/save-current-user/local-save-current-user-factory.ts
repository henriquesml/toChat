import { LocalSaveCurrentUser } from '../../../../data/usecases/save-current-user/local-save-current-user'
import { SaveCurrentUser } from '../../../../domain/usecases'
import { makeLocalStorageSetAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalSaveCurrentUser = (): SaveCurrentUser => {
  return new LocalSaveCurrentUser(makeLocalStorageSetAdapter())
}
