import { MongoHelper as sut } from '@/infra/repository/mongodb'

describe('Mongo Helper', () => {
  beforeAll(async() => {
    await sut.connect(String(process.env.MONGO_URL))
  })

  afterAll(async() => {
    await sut.disconnect()
  })

  test('Deve reconectar se o mongodb cair', async() => {
    let accountCollection = await sut.getCollection('users')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('users')
    expect(accountCollection).toBeTruthy()
  })
})
