import { UserModel } from '../models'

export type AuthenticationParams = {
  username: string
  password: string
}

export type AuthenticationResult = UserModel | null

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AuthenticationResult>
}
