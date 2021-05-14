import { LogMongoRepository, MongoHelper } from '@/infra'

import { Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

let errorCollection: Collection

describe('LogMongoRepository', () => {
  beforeAll(async() => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Deve criar um erro log', async() => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
