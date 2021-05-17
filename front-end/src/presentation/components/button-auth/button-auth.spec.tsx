
import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { ButtonAuth } from './button-auth'

type SutTypes = {
  sut: RenderResult
}

const handleMock = jest.fn()

const MakeSut = (): SutTypes => {
  const sut = render(
    <ButtonAuth data-testid="button-auth" handleSubmit={handleMock}>Entrar</ButtonAuth>
  )
  return {
    sut
  }
}

describe('Componente ButtonAuth', () => {
  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSut()
    const buttonAuth = sut.getByTestId('button-auth')
    expect(buttonAuth.textContent).toBe('Entrar')
  })

  test('Deve executar a função handleSubmit corretamente', () => {
    const { sut } = MakeSut()
    const buttonAuth = sut.getByTestId('button-auth')
    fireEvent.click(buttonAuth)
    expect(handleMock).toHaveBeenCalled()
  })
})
