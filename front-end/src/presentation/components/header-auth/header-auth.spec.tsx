import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import { render, RenderResult } from '@testing-library/react'
import { HeaderAuth } from './header-auth'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory()

const MakeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <HeaderAuth
        data-testid="header-auth"
        primaryText={faker.random.words()}
        secondaryText={faker.random.words()}
        linkText={faker.random.words()}
        linkTo={`/${faker.random.word()}`}
      >
        child
      </HeaderAuth>
    </Router>
  )
  return {
    sut
  }
}

describe('Componente HeaderAuth', () => {
  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSut()
    const headerAtuh = sut.getByTestId('header-auth')
    expect(headerAtuh).toBeValid()
  })
})
