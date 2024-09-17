import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function AppWithRoute({ routeName = '/' }) {
  return <MemoryRouter initialEntries={[routeName]} >
    <App />
  </MemoryRouter>;
}

test('van navigáció', () => {
  render(<AppWithRoute />);
  const navbar = screen.getByRole('navigation');
  expect(navbar).toBeInTheDocument();
});

test('induláskor a kezdőlap töltődik be', () => {
  render(<AppWithRoute />);

  const home = screen.getByText(/Sportágak a párizsi olimpián/i);
  expect(home).toBeInTheDocument();

  const swimming = screen.queryByText(/Úszásban 37/i);
  expect(swimming).toBeNull();

  const fencing = screen.queryByText(/Vívásban tizenkettő/i);
  expect(fencing).toBeNull();
});

test('az /uszas útvonal jól működik', () => {
  render(<AppWithRoute routeName='/uszas' />);

  const home = screen.queryByText(/Sportágak a párizsi olimpián/i);
  expect(home).toBeNull();

  const swimming = screen.getByText(/Úszásban 37/i);
  expect(swimming).toBeInTheDocument();

  const fencing = screen.queryByText(/Vívásban tizenkettő/i);
  expect(fencing).toBeNull();
});

test('a /vivas útvonal jól működik', () => {
  render(<AppWithRoute routeName='/vivas' />);

  const home = screen.queryByText(/Sportágak a párizsi olimpián/i);
  expect(home).toBeNull();

  const swimming = screen.queryByText(/Úszásban 37/i);
  expect(swimming).toBeNull();

  const fencing = screen.getByText(/Vívásban tizenkettő/i);
  expect(fencing).toBeInTheDocument();
});

