import {
  AddUserRepository,
  AddUserRepositoryParams,
  AddUserRepositoryResult,
  LoadUserByUsernameRepository,
  LoadUserByUsernameRepositoryResult,
  CheckUserByUsernameRepository,
  CheckUserByUsernameRepositoryResult
} from '@/data/protocols'

import faker from 'faker'

export class AddUserRepositorySpy implements AddUserRepository {
  params!: AddUserRepositoryParams
  result = true

  async add(
    params: AddUserRepositoryParams
  ): Promise<AddUserRepositoryResult> {
    this.params = params
    return this.result
  }
}

export class LoadUserByUsernameRepositorySpy implements LoadUserByUsernameRepository {
  username!: string
  result = {
    id: faker.datatype.uuid(),
    username: faker.name.findName(),
    password: faker.internet.password()
  } as LoadUserByUsernameRepositoryResult

  async loadByUsername(
    username: string
  ): Promise<LoadUserByUsernameRepositoryResult> {
    this.username = username
    return this.result
  }
}

export class CheckUserByUsernameRepositorySpy implements CheckUserByUsernameRepository {
  username!: string
  result = false

  async checkByUsername(
    username: string
  ): Promise<CheckUserByUsernameRepositoryResult> {
    this.username = username
    return this.result
  }
}
