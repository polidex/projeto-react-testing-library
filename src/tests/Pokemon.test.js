import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokemon from '../components/Pokemon';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokemon.js', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/Pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const pokemonImg = screen.getByAltText(/Pikachu sprite/i);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });
  test('Se ao clicar em More details deve levar a URL "/pokemons/<id>"', () => {
    const omittedBoo = true;
    const { history } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ omittedBoo }
    />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${data[0].id}`);
  });
  test('Se existe um ícone de estrela nos pokémons favoritados', () => {
    const omittedBoo = true;
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ omittedBoo } />);
    const starUrl = screen.getByAltText(`${data[0].name} is marked as favorite`);

    expect(starUrl.src).toBe('http://localhost/star-icon.svg');
  });
});
