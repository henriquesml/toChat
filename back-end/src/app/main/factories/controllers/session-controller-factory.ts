import { SessionController } from '../../../controllers'
import { ControllerProtocol } from '../../../controllers/protocols'
import { makeSessionService } from '../services'

export function makeSessionController(): ControllerProtocol {
  return new SessionController(makeSessionService())
}
