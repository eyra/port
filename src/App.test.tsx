import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders hello world', () => {
  render(<App />)
  const element = screen.getByText(/Hello, world!/i)
  expect(element).toBeInTheDocument()
})
