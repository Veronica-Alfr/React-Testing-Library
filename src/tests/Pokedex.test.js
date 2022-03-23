import React from 'react';
import { screen } from '@testing-library/react';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testes do componente Pokedex.js', () => {
  test('Testa o heading 2', () => {
    const pokes = pokemons;
    const isFavorite = pokemons.reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {});
    console.log(isFavorite);
    renderWithRouter(<Pokedex pokemons={ pokes } isPokemonFavoriteById={ isFavorite } />);
    const headPokedex = screen.getByRole('heading', { name: /Encountered/i, level: 2 });
    expect(headPokedex).toBeInTheDocument();
  });
//   test('Testa se é exibido o próximo Pokémon ao clicar no botão Próximo pokémon.', () => {
//     renderWithRouter(<Pokedex />);
//   });
});
