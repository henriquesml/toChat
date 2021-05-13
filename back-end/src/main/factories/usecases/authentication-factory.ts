import { UserMongoRepository } from '../../../infra/repository'
import { BcryptAdapter } from '../../../infra/cryptography'
import { DbAuthentication } from '../../../data/usecases'
import { Authentication } from '../../../domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMongoRepository = new UserMongoRepository()
  return new DbAuthentication(userMongoRepository, bcryptAdapter)
}
