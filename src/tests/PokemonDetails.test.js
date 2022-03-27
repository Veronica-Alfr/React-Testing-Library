import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const linkPikachu = '/pokemons/25';

describe('Testes do componente PokemonDetails.js', () => {
  test('se mais informações do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(linkPikachu);

    const namePoke = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(namePoke).toBeInTheDocument();

    // const pokemonLink = screen.getByRole('link', { name: 'More details' });
    // expect(pokemonLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const p = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(p).toBeInTheDocument();
    expect(p).toContainHTML('p');
  });
  test('se há na pag uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(linkPikachu);

    const namePoke = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(namePoke).toBeInTheDocument();

    const locationOne = screen.getByText(/Kanto Viridian Forest/i);
    expect(locationOne).toBeInTheDocument();

    const locationTwo = screen.getByText(/Kanto Power Plant/i);
    expect(locationTwo).toBeInTheDocument();

    const image = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(image).toHaveLength(2);
    expect(image[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(linkPikachu);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();

    const favoritePoke = screen
      .getByLabelText('Pokémon favoritado?', { selector: 'input' });
    expect(favoritePoke).toBeInTheDocument();
  });
});
