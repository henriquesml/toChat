import { Authentication, SaveCurrentUser } from '../../../domain/usecases'

export type LoginProps = {
  authentication: Authentication
  saveCurrentUser: SaveCurrentUser
}
