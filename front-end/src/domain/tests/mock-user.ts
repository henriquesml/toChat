import faker from 'faker'

import { AuthenticationParams, CreateUserParams } from '@/domain/usecases'
import { UserModel } from '../models'

export const mockAuthentication = (): AuthenticationParams => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
})

export const mockCreateUser = (): CreateUserParams => {
  const password = faker.internet.password()
  return {
    username: faker.internet.userName(),
    password: password,
    confirmPassword: password
  }
}

export const mockUserModel = (): UserModel => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName()
})
