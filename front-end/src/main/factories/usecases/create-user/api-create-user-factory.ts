import { CreateUser } from '../../../../domain/usecases'
import { ApiCreateUser } from '../../../../data/usecases/create-user/api-create-user'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeApiCreateUser = (): CreateUser => {
  return new ApiCreateUser(makeApiUrl('/signup'), makeAxiosHttpClient())
}
