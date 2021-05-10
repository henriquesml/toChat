import request from 'supertest'
import express from 'express'
import routes from '../routes'

const app = express()
app.use(routes)

describe('POST /users', function() {
  it('Deve responder com JSON', function(done) {
    request(app)
      .post('/users')
      .send({ username: 'henrique', password: '123456' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done)
  })
})

describe('POST /session', function() {
  it('Deve responder com JSON', function(done) {
    request(app)
      .post('/session')
      .send({ username: 'henrique', password: '123456' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403, done)
  })
})
