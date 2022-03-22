import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente About', () => {
  test('Testa se mensagem aparece na tela quando não há pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFoundPoke = screen.getByText('No favorite pokemon found');
    expect(notFoundPoke).toBeInTheDocument();
  });
  test('Testa se há pokemons na tela', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    
  });
});
