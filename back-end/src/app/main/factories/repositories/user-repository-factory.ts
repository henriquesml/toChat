import { UserRepository } from '../../../repositories'

export function makeUserRepository(): UserRepository {
  return new UserRepository()
}
