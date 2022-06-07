import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente FavoritePokemons', () => {
  test('Se aparece mensagem No favorite pokemon found, se não tem pokémons favoritados',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noFvrtPokemon = screen.getByText(/No favorite pokemon found/i);
      expect(noFvrtPokemon).toBeInTheDocument();
    });
  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);
    const fvrtPokemons = document.getElementsByClassName('favorite-pokemon');
    expect(fvrtPokemons).toHaveLength(0);
  });
});
