import { UserModel } from '../../models'
import { UserService } from '../user-service'
const mockingoose = require('mockingoose')

type SutTypes = {
  sut: UserService
}

function makeSut(): SutTypes {
  return {
    sut: new UserService()
  }
}

describe('UserService', () => {
  test('Não deve criar o usuário quando os parâmetros da requisição estiverem inválidos', async() => {
    const { sut } = makeSut()
    expect(await sut.createUser({ param1: '', param2: '' })).toEqual({
      status: 400,
      message:
        'Os dados enviados não estão corretos, verifique os dados e tente novamente.'
    })
  })

  test('Não deve criar o usuário quando já existe o username informado', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn({ _id: '609867eb4fa74251d7041ffa', username: 'henriquesml' }, 'findOne')

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
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(null, 'findOne')
    mockingoose(UserModel).toReturn({ _id: '609867eb4fa74251d7041ffa', username: 'henriquesml' }, 'save')

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
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(null, 'findOne')
    mockingoose(UserModel).toReturn(new Error('O mongo foi pras cucuia'), 'save')

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
