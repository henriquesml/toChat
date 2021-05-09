
import { UserRepository } from '../repositories'
import { createUserValidator } from '../validation/validators'
import { DefaultReturn } from './protocols'

export class UserService {
  async createUser(data: any): Promise<DefaultReturn> {
    const bodyIsValid = await createUserValidator(data)
    if (!bodyIsValid) {
      return {
        status: 400,
        message: 'Os dados enviados não estão corretos, verifique os dados e tente novamente.'
      }
    }
    const { username, password } = data
    const userExistis = await userRepository.userExists(username)
    if (userExistis) {
      return {
        status: 409,
        message:
          'Não foi possível criar a conta, o username informado já existe.'
      }
    }
    const response = await userRepository.create(username, password)
    if (response) {
      return { status: 201, message: 'Usuário criado com sucesso.' }
    } else {
      return {
        status: 500,
        message: 'Ocorreu um erro interno, por favor tente novamente.'
      }
    }
  }
}

const userRepository = new UserRepository()
