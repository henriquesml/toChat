import { UserRepository } from '../repositories'
import { userValidator } from '../validation/validators'
import { DefaultReturn } from './protocols'

type userAuth = {
  user: {
    id: any
    username: string
  }
} & DefaultReturn

class SessionService {
  async authUser(data: any): Promise<DefaultReturn | userAuth> {
    const bodyIsValid = await userValidator(data)
    if (!bodyIsValid) {
      return {
        status: 403,
        message: 'Username ou senha estão incorretos, verifique os dados e tente novamente.'
      }
    }
    const user = await UserRepository.findOneUser(data.username)

    if (!user || !(await UserRepository.checkUserPass(user, data.password))) {
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

export default new SessionService()
