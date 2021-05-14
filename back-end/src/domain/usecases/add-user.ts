export type AddUserParams = {
  username: string
  password: string
}

export type AddUserResult = boolean

export interface AddUser {
  add: (params: AddUserParams) => Promise<AddUserResult>
}
