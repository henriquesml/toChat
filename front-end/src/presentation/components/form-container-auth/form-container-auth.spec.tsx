
import React from 'react'
import { Router } from 'react-router-dom'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { FormContainerAuth } from './form-container-auth'

type SutTypes = {
  sut: RenderResult
}

const MakeSut = (): SutTypes => {
  const sut = render(
    <FormContainerAuth data-testid="form-container-auth">
      child
    </FormContainerAuth>
  )
  return {
    sut
  }
}

describe('Componente FormContainerAuth', () => {
  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSut()
    const formContainerAuth = sut.getByTestId('form-container-auth')
    expect(formContainerAuth.textContent).toBe('child')
  })
})
