import { DefaultReturn } from './default-return'

export type userAuth = {
  user: {
    id: string
    username: string
  }
} & DefaultReturn

export interface SessionServiceProtocol {
  authUser: (data: Record<string, any>) => Promise<DefaultReturn | userAuth>
}
