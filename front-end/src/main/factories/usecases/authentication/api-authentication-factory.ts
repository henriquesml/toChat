import { Authentication } from '../../../../domain/usecases'
import { ApiAuthentication } from '../../../../data/usecases/authentication/api-authentication'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeApiAuthentication = (): Authentication => {
  return new ApiAuthentication(makeApiUrl('/session'), makeAxiosHttpClient())
}
