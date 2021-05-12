import { CreateUser, SaveCurrentUser } from '../../../domain/usecases'

export type RegisterProps = {
  createUser: CreateUser
  saveCurrentUser: SaveCurrentUser
}
