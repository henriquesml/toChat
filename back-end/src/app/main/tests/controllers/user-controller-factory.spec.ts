import { UserController } from '../../../controllers'
import { ControllerProtocol } from '../../../controllers/protocols'
import { makeUserController } from '../../factories/controllers'

type SutTypes = {
  sut: ControllerProtocol
}

function makeSut(): SutTypes {
  return {
    sut: makeUserController()
  }
}

describe('makeUserController', () => {
  test('Deve retornar uma instância correta de UserController', async() => {
    const { sut } = makeSut()
    expect(sut instanceof UserController).toBe(true)
  })
})
