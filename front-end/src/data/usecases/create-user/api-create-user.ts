import { HttpPostClient, HttpStatusCode } from '../../protocols/http'
import { InvalidCredentialsError, UnexpectedError, UsernameInUseError } from '../../../domain/erros'
import { CreateUser, CreateUserParams } from '../../../domain/usecases'
import { UserModel } from '../../../domain/models'

export class ApiCreateUser implements CreateUser {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      CreateUserParams,
      UserModel
    >
  ) {}

  async createUser(params: CreateUserParams): Promise<UserModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new UsernameInUseError()
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
