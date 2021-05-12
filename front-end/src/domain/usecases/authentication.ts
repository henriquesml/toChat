import { UserModel } from '../models'

export type AuthenticationParams = {
  username: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<UserModel>
}
