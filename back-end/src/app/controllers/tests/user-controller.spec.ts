import { UserController } from '../user-controller'
import { ControllerProtocol } from '../protocols'
import { UserServiceProtocol } from '../../services/protocols'
import { MockUserService, UserServiceReturnOptions } from './mocks'

type SutTypes = {
  sut: ControllerProtocol
}

const makeMock = (options: UserServiceReturnOptions) =>
  new MockUserService(options)

function makeSut(userService: UserServiceProtocol): SutTypes {
  return {
    sut: new UserController(userService)
  }
}

describe('UserController', () => {
  test('Deve repassar a resposta do service e dizer que o body esta inválido', async() => {
    const { sut } = makeSut(makeMock('bodyIsValid'))
    const req = {} as any
    const res = {
      status: (status: number) => {
        return {
          json: ({ ...rest }) => {
            return { status: status, ...rest }
          }
        }
      }
    } as any
    expect(await sut.create(req, res)).toEqual({
      status: 400,
      message:
        'Os dados enviados não estão corretos, verifique os dados e tente novamente.'
    })
  })

  test('Deve repassar a resposta do service e dizer que o usuário já existe', async() => {
    const { sut } = makeSut(makeMock('userExistis'))
    const req = {} as any
    const res = {
      status: (status: number) => {
        return {
          json: ({ ...rest }) => {
            return { status: status, ...rest }
          }
        }
      }
    } as any
    expect(await sut.create(req, res)).toEqual({
      status: 409,
      message:
        'Não foi possível criar a conta, o username informado já existe.'
    })
  })

  test('Deve repassar a resposta do service e dizer que houve um erro interno', async() => {
    const { sut } = makeSut(makeMock('internalError'))
    const req = {} as any
    const res = {
      status: (status: number) => {
        return {
          json: ({ ...rest }) => {
            return { status: status, ...rest }
          }
        }
      }
    } as any
    expect(await sut.create(req, res)).toEqual({
      status: 500,
      message:
        'Ocorreu um erro interno, por favor tente novamente.'
    })
  })

  test('Deve repassar a resposta do service e dizer que o usuário foi criado', async() => {
    const { sut } = makeSut(makeMock('userCreated'))
    const req = {} as any
    const res = {
      status: (status: number) => {
        return {
          json: ({ ...rest }) => {
            return { status: status, ...rest }
          }
        }
      }
    } as any
    expect(await sut.create(req, res)).toEqual({
      status: 201,
      message:
        'Usuário criado com sucesso.'
    })
  })
})
