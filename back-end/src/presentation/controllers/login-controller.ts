import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest, serverError, unauthorized, ok } from '../helpers'
import { Authentication } from '../../domain/usecases'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(request: LoginControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type LoginControllerRequest = {
  username: string
  password: string
}
