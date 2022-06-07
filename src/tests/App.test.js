import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente App.js', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/About/i);
    expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);
  });

  test('Se ao clicar no link Home redireciona para a URL /', () => {
    renderWithRouter(<App />);
    const homeBtn = screen.getByRole('link', { name: 'Home' });
    expect(homeBtn.href).toBe('http://localhost/');
  });

  test('Clicar no link About redireciona para a URL /about', () => {
    renderWithRouter(<App />);
    const aboutBtn = screen.getByRole('link', { name: 'About' });
    expect(aboutBtn.href).toBe('http://localhost/about');
  });

  test('Clicar no link Favorite Pokémons redireciona para a URL /favorites', () => {
    renderWithRouter(<App />);
    const favoritesBtn = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritesBtn.href).toBe('http://localhost/favorites');
  });

  test('Se é redirecionado para Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/exemplo');
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
