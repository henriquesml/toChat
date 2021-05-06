import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders text', () => {
  render(<App />)
  const linkElement = screen.getByText(/FALA FIOTE/i)
  expect(linkElement).toBeInTheDocument()
})
