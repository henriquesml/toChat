import { UserService } from '../../../services'
import { UserServiceProtocol } from '../../../services/protocols'
import { makeUserRepository } from '../repositories'

export function makeUserService(): UserServiceProtocol {
  return new UserService(makeUserRepository())
}
