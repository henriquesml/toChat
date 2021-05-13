import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest, serverError, ok, forbidden } from '../helpers'
import { UsernameInUseError } from '../errors'
import { AddUser, Authentication } from '../../domain/usecases'

export class SignUpController implements Controller {
  constructor(
    private readonly addUser: AddUser,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(request: SignUpControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { username, password, confirmPassword } = request
      const isValid = await this.addUser.add({
        username,
        password,
        confirmPassword
      })
      if (!isValid) {
        return forbidden(new UsernameInUseError())
      }
      const authenticationModel = await this.authentication.auth({
        username,
        password
      })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type SignUpControllerRequest = {
  username: string
  password: string
  confirmPassword: string
}
