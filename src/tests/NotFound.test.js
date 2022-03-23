import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente NotFound', () => {
  test('Testa o conteúdo de heading do NotFound.js', () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(headingNotFound).toBeInTheDocument();
  });
  // Ajuda de Gustavo Rondello na lógica para ser usado regex ao invés de vários getByRole.
  test('Testa os atributos da img do NotFound.js', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
