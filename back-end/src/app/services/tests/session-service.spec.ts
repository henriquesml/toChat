import bcrypt from 'bcryptjs'
import { UserModel } from '../../models'
import { SessionService } from '../session-service'
const mockingoose = require('mockingoose')

type SutTypes = {
  sut: SessionService
}

function makeSut(): SutTypes {
  return {
    sut: new SessionService()
  }
}

describe('SessionService', () => {
  test('Não deve autenticar o usuário quando os parâmetros da requisição estiverem inválidos', async() => {
    const { sut } = makeSut()
    expect(await sut.authUser({ param1: '', param2: '' })).toEqual({
      status: 403,
      message:
        'Username ou senha estão incorretos, verifique os dados e tente novamente.'
    })
  })

  test('Não deve autenticar o usuário quando não estiver cadastrado', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(null, 'findOne')

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
    const { sut } = makeSut()
    const userPassword = await bcrypt.hash('123456', 8)
    mockingoose(UserModel).toReturn({ username: 'henriquesml', password: userPassword }, 'findOne')

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
    const { sut } = makeSut()
    const userPassword = await bcrypt.hash('123456', 8)
    mockingoose(UserModel).toReturn({ _id: '609867eb4fa74251d7041ffa', username: 'henriquesml', password: userPassword }, 'findOne')

    expect(
      await sut.authUser({
        username: 'henriquesml',
        password: '123456'
      })
    ).toEqual({
      status: 200,
      message:
        'Autenticação efetuada com sucesso.',
      user: {
        id: '609867eb4fa74251d7041ffa',
        username: 'henriquesml'
      }
    })
  })
})
