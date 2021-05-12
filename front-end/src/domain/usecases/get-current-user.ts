import { UserModel } from '../models'

export interface GetCurrentUser {
  get: () => Promise<UserModel>
}
