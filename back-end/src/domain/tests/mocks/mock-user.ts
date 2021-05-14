import { AddUserParams, AuthenticationParams } from '@/domain/usecases'
import faker from 'faker'

export const mockAddUserParams = (): AddUserParams => ({
  username: faker.name.findName(),
  password: faker.internet.password(),
  confirmPassword: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  username: faker.name.findName(),
  password: faker.internet.password()
})
