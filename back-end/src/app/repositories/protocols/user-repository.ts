import { UserInterface } from '../../models'
export type User = UserInterface

export interface UserRepositoryProtocol {
  userExists: (username: string) => Promise<boolean>
  create: (username: string, password: string) => Promise<boolean>
  findOneUser: (username: string) => Promise<UserInterface | null>
  checkUserPass: (user: UserInterface, password: string) => Promise<boolean>
}
