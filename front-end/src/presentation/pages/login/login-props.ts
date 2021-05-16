import { Validation } from '@/presentation/protocols'
import { Authentication, SaveCurrentUser } from '@/domain/usecases'

export type LoginProps = {
  authentication: Authentication
  saveCurrentUser: SaveCurrentUser
  validation: Validation
}
