import { SessionService } from '../../../services'
import { SessionServiceProtocol } from '../../../services/protocols'
import { makeUserRepository } from '../repositories'

export function makeSessionService(): SessionServiceProtocol {
  return new SessionService(makeUserRepository())
}
