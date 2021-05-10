import { SessionController } from '../../../controllers'
import { ControllerProtocol } from '../../../controllers/protocols'
import { makeSessionController } from '../../factories/controllers'

type SutTypes = {
  sut: ControllerProtocol
}

function makeSut(): SutTypes {
  return {
    sut: makeSessionController()
  }
}

describe('makeSessionController', () => {
  test('Deve retornar uma instância correta de SessionController', async() => {
    const { sut } = makeSut()
    expect(sut instanceof SessionController).toBe(true)
  })
})
