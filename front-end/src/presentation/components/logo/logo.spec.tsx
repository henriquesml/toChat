import React from 'react'
import faker from 'faker'
import { render, RenderResult } from '@testing-library/react'
import { Logo, LogoWhite } from './logo'

type SutTypes = {
  sut: RenderResult
}

const MakeSutLogo = (): SutTypes => {
  const sut = render(
    <Logo data-testid="logo"/>
  )
  return {
    sut
  }
}

const MakeSutLogoWhite = (): SutTypes => {
  const sut = render(
    <LogoWhite data-testid="logo"/>
  )
  return {
    sut
  }
}

describe('Componente Logo', () => {
  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSutLogo()
    const logo = sut.getByTestId('logo')
    expect(logo).toBeValid()
  })

  test('Deve renderizar corretamente', () => {
    const { sut } = MakeSutLogoWhite()
    const logo = sut.getByTestId('logo')
    expect(logo).toBeValid()
  })
})
