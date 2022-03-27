import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';

const justPikachu = require('./mockPikachu');

describe('Testes do componente Pokemon.js', () => {
  test('se é renderizado as informações de determinado pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ justPikachu[0] }
      showDetailsLink
      isFavorite
    />);
    const dataIdName = screen.getByTestId('pokemon-name');
    expect(dataIdName).toHaveTextContent('Pikachu');

    const dataIdType = screen.getByTestId('pokemon-type');
    expect(dataIdType).toHaveTextContent('Electric');

    const dataIdWeigth = screen.getByTestId('pokemon-weight');
    expect(dataIdWeigth).toHaveTextContent('Average weight: 6.0 kg');

    const image = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('se há um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />); // Ajuda de Danillo Gonçalves para entender que era melhor
    // utilizar o componente App do que o componente Pokemon para os testes a seguir:
    const pokemonLink = screen.getByRole('link', { name: 'More details' });
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(pokemonLink);
    const subtitle = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(subtitle).toBeInTheDocument();
  });
  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon
      pokemon={ justPikachu[0] }
      showDetailsLink
      isFavorite
    />);
    const imgFavorite = screen.getByRole('img', { name: /Pikachu is marked/i });
    expect(imgFavorite).toBeInTheDocument();
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
