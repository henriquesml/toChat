import { UserServiceProtocol, DefaultReturn } from '../../../services/protocols'

export type UserServiceReturnOptions = 'bodyIsValid' | 'userExistis' | 'userCreated' | 'internalError'

export class MockUserService implements UserServiceProtocol {
  constructor(private readonly returnOptions: UserServiceReturnOptions) {}
  createUser(data: any): Promise<DefaultReturn> {
    return Promise.resolve(returnOptions[this.returnOptions])
  }
}

const returnOptions = {
  bodyIsValid: {
    status: 400,
    message:
      'Os dados enviados não estão corretos, verifique os dados e tente novamente.'
  },
  userExistis: {
    status: 409,
    message: 'Não foi possível criar a conta, o username informado já existe.'
  },
  userCreated: { status: 201, message: 'Usuário criado com sucesso.' },
  internalError: {
    status: 500,
    message: 'Ocorreu um erro interno, por favor tente novamente.'
  }
}
