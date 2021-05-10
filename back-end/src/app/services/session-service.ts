import { userValidator } from '../validation/validators'
import { SessionServiceProtocol, DefaultReturn, userAuth } from './protocols'
import { UserRepositoryProtocol } from '../repositories/protocols'

export class SessionService implements SessionServiceProtocol {
  constructor(private readonly userRepository: UserRepositoryProtocol) {}
  async authUser(data: any): Promise<DefaultReturn | userAuth> {
    const bodyIsValid = await userValidator(data)
    if (!bodyIsValid) {
      return {
        status: 403,
        message: 'Username ou senha estão incorretos, verifique os dados e tente novamente.'
      }
    }
    const user = await this.userRepository.findOneUser(data.username)

    if (!user || !(await this.userRepository.checkUserPass(user, data.password))) {
      return { status: 401, message: 'Não foi possível efetuar o login. Verifique os dados enviados e tente novamente.' }
    }

    const { _id, username } = user

    return {
      status: 200,
      message: 'Autenticação efetuada com sucesso.',
      user: { id: String(_id), username: username }
    }
  }
}
