import { createUserValidator, userValidator } from '../user-validator'

describe('createUserValidator', () => {
  test('Deve retornar true se os dados estiverem corretos', async() => {
    const validation = await userValidator({ username: 'henrique', password: '123456' })
    expect(validation).toEqual(true)
  })

  test('Deve retornar false se os dados estiverem incorretos', async() => {
    const validation = await userValidator({ username: 'henrique', password: '123' })
    expect(validation).toEqual(false)
  })
})

describe('userValidator', () => {
  test('Deve retornar true se os dados estiverem corretos', async() => {
    const validation = await createUserValidator({ username: 'henrique', password: '123456', confirmPassword: '123456' })
    expect(validation).toEqual(true)
  })

  test('Deve retornar false se os dados estiverem incorretos', async() => {
    const validation = await createUserValidator({ username: 'henrique', password: '123456', confirmPassword: '12345677777777' })
    expect(validation).toEqual(false)
  })
})
