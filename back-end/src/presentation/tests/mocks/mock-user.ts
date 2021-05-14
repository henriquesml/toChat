import { AddUser, AddUserParams, AddUserResult, Authentication, AuthenticationParams, AuthenticationResult } from '@/domain/usecases'

import faker from 'faker'

export class AddUserSpy implements AddUser {
  params!: AddUserParams
  result = true

  async add(params: AddUserParams): Promise<AddUserResult> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params!: AuthenticationParams
  result = {
    id: faker.datatype.uuid(),
    username: faker.name.findName()
  } as AuthenticationResult

  async auth(params: AuthenticationParams): Promise<AuthenticationResult> {
    this.params = params
    return this.result
  }
}
