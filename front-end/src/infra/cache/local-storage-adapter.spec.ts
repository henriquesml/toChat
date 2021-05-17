import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageGetAdapter, LocalStorageSetAdapter } from './local-storage-adapter'

const makeSutGet = (): LocalStorageGetAdapter => new LocalStorageGetAdapter()
const makeSutSet = (): LocalStorageSetAdapter => new LocalStorageSetAdapter()

describe('LocalStorageGetAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Deve chama o LocalStorage com os valores corretos ', async() => {
    const sut = makeSutGet()
    const key = faker.database.column()
    await sut.get(key)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })
})

describe('LocalStorageSetAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Deve chama o LocalStorage com os valores corretos ', async() => {
    const sut = makeSutSet()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
