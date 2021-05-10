import { DefaultReturn } from './default-return'

export interface UserServiceProtocol {
  createUser: (data: Record<string, any>) => Promise<DefaultReturn>
}
