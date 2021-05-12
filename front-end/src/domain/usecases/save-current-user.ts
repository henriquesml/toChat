export interface SaveCurrentUser {
  save: (id: string, username: string) => Promise<void>
}
