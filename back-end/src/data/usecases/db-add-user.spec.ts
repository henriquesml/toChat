import { DbAddUser } from '@/data/usecases'
import { mockAddUserParams, throwError } from '@/domain/tests/mocks'
import {
  HasherSpy,
  AddUserRepositorySpy,
  CheckUserByUsernameRepositorySpy
} from '@/data/tests/mocks'

type SutTypes = {
  sut: DbAddUser
  hasherSpy: HasherSpy
  addUserRepositorySpy: AddUserRepositorySpy
  checkUserByUsernameRepositorySpy: CheckUserByUsernameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkUserByUsernameRepositorySpy = new CheckUserByUsernameRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addUserRepositorySpy = new AddUserRepositorySpy()
  const sut = new DbAddUser(
    hasherSpy,
    addUserRepositorySpy,
    checkUserByUsernameRepositorySpy
  )
  return {
    sut,
    hasherSpy,
    addUserRepositorySpy,
    checkUserByUsernameRepositorySpy
  }
}

describe('DbAddUser Usecase', () => {
  test('Deve chamar o Hasher com o plaintext correto', async() => {
    const { sut, hasherSpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(hasherSpy.plaintext).toBe(addUserParams.password)
  })

  test('Dever retornar throw caso o Hasher throws', async() => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Deve chamar o AddUserRepository com os valores corretos', async() => {
    const { sut, addUserRepositorySpy, hasherSpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(addUserRepositorySpy.params).toEqual({
      username: addUserParams.username,
      password: hasherSpy.digest
    })
  })

  test('Dever retornar throw caso o AddUserRepository throws', async() => {
    const { sut, addUserRepositorySpy } = makeSut()
    jest
      .spyOn(addUserRepositorySpy, 'add')
      .mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Deve retornar true se for válido', async() => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddUserParams())
    expect(isValid).toBe(true)
  })

  test('Deve retornar false se AddUserRepository retornar false', async() => {
    const { sut, addUserRepositorySpy } = makeSut()
    addUserRepositorySpy.result = false
    const isValid = await sut.add(mockAddUserParams())
    expect(isValid).toBe(false)
  })

  test('Deve retornar false se CheckUserByUsernameRepository retornar true', async() => {
    const { sut, checkUserByUsernameRepositorySpy } = makeSut()
    checkUserByUsernameRepositorySpy.result = true
    const isValid = await sut.add(mockAddUserParams())
    expect(isValid).toBe(false)
  })

  test('Deve chamar o LoadUserByUsernameRepository como o valor do username correto', async() => {
    const { sut, checkUserByUsernameRepositorySpy } = makeSut()
    const addUserParams = mockAddUserParams()
    await sut.add(addUserParams)
    expect(checkUserByUsernameRepositorySpy.username).toBe(addUserParams.username)
  })
})
