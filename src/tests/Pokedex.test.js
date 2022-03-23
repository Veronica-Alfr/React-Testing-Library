import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const data = require('./mockData');
const justPikachu = require('./mockPikachu');

describe('Testes do componente Pokedex.js', () => {
  test('Testa o heading 2', () => {
    const pokes = pokemons;
    const isFavorite = pokemons.reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {});
    renderWithRouter(<Pokedex pokemons={ pokes } isPokemonFavoriteById={ isFavorite } />);
    const headPokedex = screen.getByRole('heading', { name: /Encountered/i, level: 2 });
    expect(headPokedex).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon ao clicar no botão Próximo pokémon.', () => {
    const isFavorite = {
      25: true,
      4: false,
    };

    renderWithRouter(<Pokedex pokemons={ data } isPokemonFavoriteById={ isFavorite } />);
    const buttonNextPoke = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNextPoke).toBeInTheDocument();

    const dataIdName = screen.getByTestId('pokemon-name');
    expect(dataIdName).toHaveTextContent('Pikachu');

    userEvent.click(buttonNextPoke);

    expect(dataIdName).toHaveTextContent('Charmander');

    userEvent.click(buttonNextPoke);

    expect(dataIdName).toHaveTextContent('Pikachu');
  });
  test('Testa se há apenas um pokemon por vez', () => {
    const isFavorite = {
      25: true,
    };
    renderWithRouter(<Pokedex
      pokemons={ justPikachu }
      isPokemonFavoriteById={ isFavorite }
    />);
    expect(justPikachu).toHaveLength(1);
  });
  test('Testa se a Pokédex tem os botões de filtro.', () => {
    const isFavorite = {
      25: true,
      4: false,
    };

    renderWithRouter(<Pokedex pokemons={ data } isPokemonFavoriteById={ isFavorite } />);
    const nameButton = data[0].type;
    const buttonPoke = screen.getByRole('button', { name: nameButton });
    expect(buttonPoke).toBeInTheDocument();

    userEvent.click(buttonPoke);

    const pokeByType = data[0];
    expect(pokeByType.type).toContain('Electric');
  });
  test('Testa o botão All.', () => {
    const pokes = pokemons;
    const isFavorite = pokemons.reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {});

    renderWithRouter(<Pokedex pokemons={ pokes } isPokemonFavoriteById={ isFavorite } />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeVisible();

    expect(buttonAll).not.toBeDisabled();

    userEvent.click(buttonAll);
    expect(pokes).toBeVisible();
    // usar push para a home? ou o not disabled no inicio e final?
  });
});
