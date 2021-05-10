import { SessionController } from '../session-controller'
import { ControllerProtocol } from '../protocols'
import { SessionServiceProtocol } from '../../services/protocols'
import { MockSessionService, SessionServiceReturnOptions } from './mocks'

type SutTypes = {
  sut: ControllerProtocol
}

const makeMock = (options: SessionServiceReturnOptions) =>
  new MockSessionService(options)

function makeSut(SessionService: SessionServiceProtocol): SutTypes {
  return {
    sut: new SessionController(SessionService)
  }
}

describe('SessionController', () => {
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
      status: 403,
      message:
        'Username ou senha estão incorretos, verifique os dados e tente novamente.'
    })
  })

  test('Deve repassar a resposta do service e dizer que a autênticação falhou', async() => {
    const { sut } = makeSut(makeMock('authFail'))
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
      status: 401,
      message:
        'Não foi possível efetuar o login. Verifique os dados enviados e tente novamente.'
    })
  })

  test('Deve repassar a resposta do service e dizer que a autênticação ocorreu com sucesso', async() => {
    const { sut } = makeSut(makeMock('authSuccess'))
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
      status: 200,
      message:
        'Autenticação efetuada com sucesso.',
      user: { id: '1', username: 'henrique' }
    })
  })
})
