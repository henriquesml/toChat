
export type CheckUserByUsernameRepositoryResult = boolean

export interface CheckUserByUsernameRepository {
  checkByUsername: (username: string) => Promise<CheckUserByUsernameRepositoryResult>
}
