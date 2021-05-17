
import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { FormBoxAuth } from './form-box-auth'

type SutTypes = {
  sut: RenderResult
}

const MakeSut = (): SutTypes => {
  const sut = render(
    <FormBoxAuth data-testid="form-box-auth">
      child
    </FormBoxAuth>
  )
  return {
    sut
  }
}

describe('Componente FormBoxAuth', () => {
  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSut()
    const FormBoxAuth = sut.getByTestId('form-box-auth')
    expect(FormBoxAuth.textContent).toBe('child')
  })
})
