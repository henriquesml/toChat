import { SessionServiceProtocol, DefaultReturn, userAuth } from '../../../services/protocols'

export type SessionServiceReturnOptions = 'bodyIsValid' | 'authFail' | 'authSuccess'

export class MockSessionService implements SessionServiceProtocol {
  constructor(private readonly returnOptions: SessionServiceReturnOptions) {}
  async authUser(data: any): Promise<DefaultReturn | userAuth> {
    return Promise.resolve(returnOptions[this.returnOptions])
  }
}

const returnOptions = {
  bodyIsValid: {
    status: 403,
    message:
      'Username ou senha estão incorretos, verifique os dados e tente novamente.'
  },
  authFail: {
    status: 401,
    message: 'Não foi possível efetuar o login. Verifique os dados enviados e tente novamente.'
  },
  authSuccess: { status: 200, message: 'Autenticação efetuada com sucesso.', user: { id: '1', username: 'henrique' } }
}
