import React from 'react'

import faker from 'faker'
import { render, RenderResult } from '@testing-library/react'
import { InputLabel } from './input-label'

type SutTypes = {
  sut: RenderResult
}

const MakeSut = (): SutTypes => {
  const sut = render(
    <InputLabel data-testid="input-label" label={faker.random.word()} />
  )
  return {
    sut
  }
}

describe('Componente InputLabel', () => {
  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSut()
    const inputLabel = sut.getByTestId('input-label')
    expect(inputLabel).toBeValid()
  })
})
