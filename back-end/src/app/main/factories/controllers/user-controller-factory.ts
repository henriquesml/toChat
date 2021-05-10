import { UserController } from '../../../controllers'
import { ControllerProtocol } from '../../../controllers/protocols'
import { makeUserService } from '../services'

export function makeUserController(): ControllerProtocol {
  return new UserController(makeUserService())
}
