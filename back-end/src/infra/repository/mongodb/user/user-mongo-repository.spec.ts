import { UserMongoRepository, MongoHelper } from '@/infra/repository'
import { mockAddUserParams } from '@/domain/tests/mocks'

import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let userCollection: Collection

describe('UserMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Deve retornar um user ao obter successo', async() => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const isValid = await sut.add(addUserParams)
      expect(isValid).toBe(true)
    })
  })

  describe('loadByUsername()', () => {
    test('Deve retornar um user ao obter sucesso', async() => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const user = await sut.loadByUsername(addUserParams.username)
      expect(user).toBeTruthy()
      expect(user?.id).toBeTruthy()
      expect(user?.username).toBe(addUserParams.username)
      expect(user?.password).toBe(addUserParams.password)
    })

    test('Deve retornar null se loadByUsername falhar', async() => {
      const sut = makeSut()
      const user = await sut.loadByUsername(faker.name.findName())
      expect(user).toBeFalsy()
    })
  })

  describe('checkByUsername()', () => {
    test('Deve retornar true se username for válido', async() => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const exists = await sut.checkByUsername(addUserParams.username)
      expect(exists).toBe(true)
    })

    test('Deve retornar false se username não for válido', async() => {
      const sut = makeSut()
      const exists = await sut.checkByUsername(faker.name.findName())
      expect(exists).toBe(false)
    })
  })
})
