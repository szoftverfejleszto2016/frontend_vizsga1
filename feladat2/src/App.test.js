import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Oldal elemeinek vizsgálata', () => {
  test('fejléc szövege', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /párizsi képek/i });
    expect(heading).toBeInTheDocument();
  });

  test('képek száma', () => {
    render(<App />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6);
  });

  test('képek megléte az alternatív szövegek alapján', () => {
    render(<App />);
    const image1 = screen.getByAltText('olimpia1');
    const image2 = screen.getByAltText('olimpia2');
    const image3 = screen.getByAltText('olimpia3');
    const image4 = screen.getByAltText('olimpia4');
    const image5 = screen.getByAltText('olimpia5');
    const image6 = screen.getByAltText('olimpia6');
    
    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
    expect(image3).toBeInTheDocument();
    expect(image4).toBeInTheDocument();
    expect(image5).toBeInTheDocument();
    expect(image6).toBeInTheDocument();
  });
});

describe('Stílusok vizsgálata', () => {
  test('container osztály vizsgálata', () => {
    const { container } = render(<App />);
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
  });
  
  test('Cím igazításának vizsgálata', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /párizsi képek/i });
    expect(heading).toHaveClass('text-center');
  });

  test('Képek reszponzívak-e', () => {
    render(<App />);
    const images = screen.getAllByRole('img');
    images.forEach((image) => {
      expect(image).toHaveClass('img-fluid');
    });
  });

  test('Oszlopok használata', () => {
    render(<App />);
    const imageContainers = screen.getAllByRole('img').map((img) => img.closest('div'));
    imageContainers.forEach((container) => {
      expect(container).toHaveClass('col-md-6');
      expect(container).toHaveClass('col-lg-4');
    });
  });
});