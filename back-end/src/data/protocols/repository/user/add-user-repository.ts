import { AddUserResult, AddUserParams } from '../../../../domain/usecases'

export interface AddUserRepository {
  add: (data: AddUserParams) => Promise<AddUserResult>
}

export type AddUserRepositoryParams = AddUserParams
export type AddUserRepositoryResult = boolean
