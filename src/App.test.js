import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', async () => {
  render(<App />)
  // esto nos permite consultar de forma asincrona para ver si un elemento esta o no
  const title = await screen.findByText(/Ultimos Gifs Buscados/i)
  expect(title).toBeInTheDocument()
});
