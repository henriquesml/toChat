import { HttpPostClient, HttpStatusCode } from '../../protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '../../../domain/erros'
import { Authentication, AuthenticationParams } from '../../../domain/usecases'
import { UserModel } from '../../../domain/models'

export class ApiAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      UserModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<UserModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
