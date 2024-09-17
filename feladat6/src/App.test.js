import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

global.fetch = async function mockFetch() {
  return {
    status: 200,
    statusText: 'OK',
    ok: true,
    json: async () => {
      return [
        {"url": "https://cdn2.thecatapi.com/images/tmH3RG7rD.jpg"}
      ];
    }
  };
}

test('megjeleníti a spinnert, majd a képet, utána ellenőrzi a gomb meglétét', async () => {
  render(<App />);
  const loader = await screen.findByAltText(/Betöltés/i);
  expect(loader).toBeInTheDocument();
  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();
  });
  const catImage = await screen.findByAltText(/macska kép/i)
  expect(catImage).toBeInTheDocument();
  expect(catImage.src).toBe('https://cdn2.thecatapi.com/images/tmH3RG7rD.jpg');
  const button = screen.getByRole('button', { name: /Következő/i });
  expect(button).toBeInTheDocument();
});
