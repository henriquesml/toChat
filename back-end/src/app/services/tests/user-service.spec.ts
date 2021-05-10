import { UserRepositoryProtocol, User } from '../../repositories/protocols'
import { UserService } from '../user-service'
import { MockUserRepositoryHappyPath, MockUserRepositoryUnhappyPath } from './mocks'

type SutTypes = {
  sut: UserService
}

const makeMockUnhappyPath = (userExists: boolean) => new MockUserRepositoryUnhappyPath(userExists)
const makeMockHappyPath = (user: User | null) => new MockUserRepositoryHappyPath(user)

function makeSut(userRepository: UserRepositoryProtocol): SutTypes {
  return {
    sut: new UserService(userRepository)
  }
}

describe('UserService', () => {
  test('Não deve criar o usuário quando os parâmetros da requisição estiverem inválidos', async() => {
    const { sut } = makeSut(makeMockUnhappyPath(false))
    expect(await sut.createUser({ param1: '', param2: '' })).toEqual({
      status: 400,
      message:
        'Os dados enviados não estão corretos, verifique os dados e tente novamente.'
    })
  })

  test('Não deve criar o usuário quando já existe o username informado', async() => {
    const { sut } = makeSut(makeMockUnhappyPath(true))

    expect(
      await sut.createUser({
        username: 'henriquesml',
        password: '123456',
        confirmPassword: '123456'
      })
    ).toEqual({
      status: 409,
      message:
        'Não foi possível criar a conta, o username informado já existe.'
    })
  })

  test('Deve criar o usuário corretamente', async() => {
    const { sut } = makeSut(makeMockHappyPath(null))

    expect(
      await sut.createUser({
        username: 'henriquesml',
        password: '123456',
        confirmPassword: '123456'
      })
    ).toEqual({
      status: 201,
      message:
        'Usuário criado com sucesso.'
    })
  })

  test('Deve notificar o usuário quando acontecer um erro interno', async() => {
    const { sut } = makeSut(makeMockUnhappyPath(false))

    expect(
      await sut.createUser({
        username: 'henriquesml',
        password: '123456',
        confirmPassword: '123456'
      })
    ).toEqual({
      status: 500,
      message:
        'Ocorreu um erro interno, por favor tente novamente.'
    })
  })
})
