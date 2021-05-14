import app from '@/main/config/app'
import { MongoHelper } from '@/infra/repository'

import { Collection } from 'mongodb'
import { hash } from 'bcryptjs'
import request from 'supertest'

let userCollection: Collection

describe('Login Routes', () => {
  beforeAll(async() => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async() => {
    await MongoHelper.disconnect()
  })

  beforeAll(async() => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Deve retornar 200 em signup', async() => {
      await request(app)
        .post('/api/signup')
        .send({
          username: 'henrique',
          password: '123456',
          confirmPassword: '123456'
        })
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send({
          username: 'henrique',
          password: '123456',
          confirmPassword: '123456'
        })
        .expect(403)
    })
  })

  describe('POST /login', () => {
    test('Deve retornar 200 em login', async() => {
      const password = await hash('123456', 12)
      await userCollection.insertOne({
        username: 'henrique',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          username: 'henrique',
          password: '123456'
        })
        .expect(200)
    })

    test('Deve retornar 401 em login', async() => {
      await request(app)
        .post('/api/login')
        .send({
          username: 'nexiste',
          password: '123456'
        })
        .expect(401)
    })
  })
})
