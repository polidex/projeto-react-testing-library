import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokedex', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pageHeading = screen.getByRole('heading', { level: 2 });

    expect(pageHeading).toBeInTheDocument();
  });
  test('Se é exibido o próximo pokémon quando o respectivo botão é clicado', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByText(/Próximo pokémon/i);
    const pokemonList = document.getElementsByClassName('pokemon');

    expect(btnNextPokemon).toBeInTheDocument();
    expect(pokemonList).toHaveLength(1);
  });
  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonTypeDragon = screen.getByRole('button', { name: /dragon/i });

    buttons.forEach((buttonType) => {
      expect(buttonType).toBeInTheDocument();
    });

    userEvent.click(buttonTypeDragon);
    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();
  });
  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByText(/all/i);
    const buttonTypeDragon = screen.getByRole('button', { name: /dragon/i });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonTypeDragon).toBeInTheDocument();

    userEvent.click(buttonTypeDragon);
    userEvent.click(buttonAll);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
