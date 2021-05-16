import { Validation } from '@/presentation/protocols'
import { CreateUser, SaveCurrentUser } from '@/domain/usecases'

export type RegisterProps = {
  createUser: CreateUser
  saveCurrentUser: SaveCurrentUser
  validation: Validation
}
