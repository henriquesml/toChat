import { SessionService } from '../session-service'
import { UserRepositoryProtocol, User } from '../../repositories/protocols'
import { MockUserRepositoryHappyPath, MockUserRepositoryUnhappyPath } from './mocks'

type SutTypes = {
  sut: SessionService
}

const makeMockUnhappyPath = (userExists: boolean) => new MockUserRepositoryUnhappyPath(userExists)
const makeMockHappyPath = (user: User | null) => new MockUserRepositoryHappyPath(user)

function makeSut(userRepository: UserRepositoryProtocol): SutTypes {
  return {
    sut: new SessionService(userRepository)
  }
}
describe('SessionService', () => {
  test('Não deve autenticar o usuário quando os parâmetros da requisição estiverem inválidos', async() => {
    const { sut } = makeSut(makeMockUnhappyPath(false))
    expect(await sut.authUser({ param1: '', param2: '' })).toEqual({
      status: 403,
      message:
        'Username ou senha estão incorretos, verifique os dados e tente novamente.'
    })
  })

  test('Não deve autenticar o usuário quando não estiver cadastrado', async() => {
    const { sut } = makeSut(makeMockUnhappyPath(false))

    expect(
      await sut.authUser({
        username: 'nao_to_no_db',
        password: 'xurasbeng_thurasban'
      })
    ).toEqual({
      status: 401,
      message:
        'Não foi possível efetuar o login. Verifique os dados enviados e tente novamente.'
    })
  })

  test('Não deve autenticar o usuário quando errar a senha', async() => {
    const { sut } = makeSut(makeMockUnhappyPath(false))

    expect(
      await sut.authUser({
        username: 'henriquesml',
        password: '1234567'
      })
    ).toEqual({
      status: 401,
      message:
        'Não foi possível efetuar o login. Verifique os dados enviados e tente novamente.'
    })
  })

  test('Deve autenticar o usuário quando os dados estiverem corretos', async() => {
    const { sut } = makeSut(makeMockHappyPath({ _id: '609867eb4fa74251d7041ffa', username: 'henrique' } as User))

    expect(
      await sut.authUser({
        username: 'henrique',
        password: '123456'
      })
    ).toEqual({
      status: 200,
      message:
        'Autenticação efetuada com sucesso.',
      user: {
        id: '609867eb4fa74251d7041ffa',
        username: 'henrique'
      }
    })
  })
})
