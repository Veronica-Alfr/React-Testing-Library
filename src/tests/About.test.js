import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente About', () => {
  test('Testa o conteúdo de About.js', () => {
    renderWithRouter(<About />);
    const headAbout = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(headAbout).toBeInTheDocument();

    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /Pokédex/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
