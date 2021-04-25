import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

test('search form could be used', async () => {
    render ( <App />)
    const input = await screen.findByRole('textbox')
    const button = await screen.findByRole('button')

    fireEvent.change(input, { target: { value: 'Matrix' }})
    fireEvent.click(button)

    screen.debug()

    const title = await screen.findByText('Matrix')
    expect(title).toBeVisible()
});
