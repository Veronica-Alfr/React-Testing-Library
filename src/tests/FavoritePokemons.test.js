import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testes do componente About', () => {
  test('Testa se mensagem aparece na tela quando não há pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFoundPoke = screen.getByText('No favorite pokemon found');
    expect(notFoundPoke).toBeInTheDocument();
  });
  test('Testa se há pokemons na tela', () => {
    const pokeFilter = pokemons.filter((pokemon) => pokemon.name === 'Pikachu');
    renderWithRouter(<FavoritePokemons pokemons={ pokeFilter } />);
    expect(pokeFilter[0].type).toBe('Electric');
  });
});
