import { DbAuthentication } from '@/data/usecases'
import { HashComparerSpy, LoadUserByUsernameRepositorySpy } from '@/data/tests/mocks'
import { throwError, mockAuthenticationParams } from '@/domain/tests/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadUserByUsernameRepositorySpy: LoadUserByUsernameRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const loadUserByUsernameRepositorySpy = new LoadUserByUsernameRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new DbAuthentication(
    loadUserByUsernameRepositorySpy,
    hashComparerSpy
  )
  return {
    sut,
    loadUserByUsernameRepositorySpy,
    hashComparerSpy
  }
}

describe('DbAuthentication UseCase', () => {
  test('Deve chamar o LoadUserByUsernameRepository with correct Username', async() => {
    const { sut, loadUserByUsernameRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadUserByUsernameRepositorySpy.username).toBe(authenticationParams.username)
  })

  test('Deve retornar throw se LoadUserByUsernameRepository throws', async() => {
    const { sut, loadUserByUsernameRepositorySpy } = makeSut()
    jest.spyOn(loadUserByUsernameRepositorySpy, 'loadByUsername').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Deve retornar null se LoadUserByUsernameRepository retornar null', async() => {
    const { sut, loadUserByUsernameRepositorySpy } = makeSut()
    loadUserByUsernameRepositorySpy.result = null
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })

  test('Deve chamar o HashComparer com os valores corretos', async() => {
    const { sut, hashComparerSpy, loadUserByUsernameRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(loadUserByUsernameRepositorySpy.result?.password)
  })

  test('Deve retornar throw se HashComparer throws', async() => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Deve retornar null se HashComparer retornar false', async() => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })
})
