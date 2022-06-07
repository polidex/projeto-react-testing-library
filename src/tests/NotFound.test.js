import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente NotFound', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const pageNotFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(pageNotFound).toBeInTheDocument();
  });
  test('Se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
