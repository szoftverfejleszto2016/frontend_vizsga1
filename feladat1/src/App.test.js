import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('van fejléc képpel és címmel', () => {
  render(<App />);
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement.tagName).toMatch(/^header$/i);

  const imageElement = screen.getByAltText('Párizs 2024');
  expect(headerElement).toContainElement(imageElement);

  const headingElement = screen.getByText('XXXIII. nyári olimpiai játékok');
  expect(headingElement.tagName).toMatch(/^h1$/i);
  expect(headerElement).toContainElement(headingElement);
});

test('van main szakasz', () => {
  render(<App />);
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();
  expect(mainElement.tagName).toMatch(/^main$/i);
});

test('a main szakasz tartalmazza a szöveget', () => {
  render(<App />);
  const mainElement = screen.getByRole('main');
  const lastParagraph = screen.getByText(/^Az olimpiát Párizsban rendezték, bár a szörfversenyeket az egyik francia tengerentúli területen, Tahitin tartották./);
  expect(lastParagraph.tagName).toMatch(/^p$/i);
  expect(mainElement).toContainElement(lastParagraph);
});
