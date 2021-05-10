import bcrypt from 'bcryptjs'
import { UserModel, UserInterface } from '../../models'
import { UserRepository } from '../user-repository'
const mockingoose = require('mockingoose')

type SutTypes = {
  sut: UserRepository
}

function makeSut(): SutTypes {
  return {
    sut: new UserRepository()
  }
}

beforeEach(() => {
  mockingoose.resetAll()
})

describe('UserService', () => {
  test('Deve retornar true se o usuário existir no banco', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(
      { _id: '609867eb4fa74251d7041ffa', username: 'henriquesml' },
      'findOne'
    )
    expect(await sut.userExists('henrique')).toEqual(true)
  })

  test('Deve retornar false se o usuário não existir no banco', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(null, 'findOne')
    expect(await sut.userExists('henrique')).toEqual(false)
  })

  test('Deve retornar true ao criar o usuário corretamente', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(
      { _id: '609867eb4fa74251d7041ffa', username: 'henriquesml' },
      'save'
    )
    expect(await sut.create('henrique', '123456')).toEqual(true)
  })

  test('Deve retonar false ao tentar criar o usuário e mongo retornar um erro', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(
      new Error('O mongo foi pras cucuia'),
      'save'
    )
    expect(await sut.create('henrique', '123456')).toEqual(false)
  })

  test('Deve retornar o usuário corretamente se ele existir no banco', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(
      {
        _id: '609867eb4fa74251d7041ffa',
        username: 'henrique'
      },
      'findOne'
    )
    const user = await sut.findOneUser('henrique')
    const { _id, username } = user as UserInterface
    expect({ _id: String(_id), username }).toEqual({
      _id: '609867eb4fa74251d7041ffa',
      username: 'henrique'
    })
  })

  test('Deve retornar null quando o usuário não existir no banco', async() => {
    const { sut } = makeSut()
    mockingoose(UserModel).toReturn(null, 'findOne')
    expect(await sut.findOneUser('henrique')).toEqual(null)
  })

  test('Deve retornar true se a senha for válida', async() => {
    const { sut } = makeSut()
    const user = { password: await bcrypt.hash('123456', 8) } as UserInterface
    expect(await sut.checkUserPass(user, '123456')).toEqual(true)
  })

  test('Deve retornar false se a senha for inválida', async() => {
    const { sut } = makeSut()
    const user = { password: await bcrypt.hash('123456', 8) } as UserInterface
    expect(await sut.checkUserPass(user, '12345666')).toEqual(false)
  })
})
