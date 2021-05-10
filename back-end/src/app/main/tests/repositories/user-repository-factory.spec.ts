import { UserRepository } from '../../../repositories'
import { makeUserRepository } from '../../factories/repositories'

type SutTypes = {
  sut: UserRepository
}

function makeSut(): SutTypes {
  return {
    sut: makeUserRepository()
  }
}

describe('makeUserRepository', () => {
  test('Deve retornar uma instância correta de UserRepository', async() => {
    const { sut } = makeSut()
    expect(sut instanceof UserRepository).toBe(true)
  })
})
