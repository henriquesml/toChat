export interface LoadUserByUsernameRepository {
  loadByUsername: (username: string) => Promise<LoadUserByUsernameRepositoryResult>
}

export type LoadUserByUsernameRepositoryResult = {
  id: string
  username: string
  password: string
}
