
import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { GridAuth } from './grid-auth'

type SutTypes = {
  sut: RenderResult
}

const MakeSut = (): SutTypes => {
  const sut = render(
    <GridAuth data-testid="grid-auth">
      child
    </GridAuth>
  )
  return {
    sut
  }
}

describe('Componente GridAuth', () => {
  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSut()
    const gridAuth = sut.getByTestId('grid-auth')
    expect(gridAuth.textContent).toBe('child')
  })
})
