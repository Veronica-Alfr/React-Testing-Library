import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';

const justPikachu = require('./mockPikachu');

describe('Testes do componente Pokemon.js', () => {
  test('se é renderizado as informações de determinado pokemon', () => {
    const isFavorite = {
      25: true,
    };
    const withLink = true;
    renderWithRouter(<Pokemon
      isFavorite={ isFavorite }
      pokemon={ justPikachu }
      showDetailsLink={ withLink }
    />);
    console.log(justPikachu);
    const dataIdName = screen.getByTestId('pokemon-name');
    console.log(dataIdName);
    expect(dataIdName).toHaveTextContent('Pikachu');
  });
});
