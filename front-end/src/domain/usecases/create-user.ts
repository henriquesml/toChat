import { UserModel } from '../models'

export type CreateUserParams = {
  username: string
  password: string
  confirmPassword: string
}

export interface CreateUser {
  createUser: (params: CreateUserParams) => Promise<UserModel>
}
