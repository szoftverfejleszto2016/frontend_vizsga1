import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App komponens', () => {
  test('Fejléc', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /éremtáblázat/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-center');
  });

  test('Táblázat fejléce', () => {
    render(<App />);
    const countryHeader = screen.getByText('Ország');
    const goldHeader = screen.getByText('Arany');
    const silverHeader = screen.getByText('Ezüst');
    const bronzeHeader = screen.getByText('Bronz');

    expect(countryHeader).toBeInTheDocument();
    expect(goldHeader).toBeInTheDocument();
    expect(silverHeader).toBeInTheDocument();
    expect(bronzeHeader).toBeInTheDocument();
  });

  test('Sorok száma', () => {
    render(<App />);
    const rows = screen.getAllByRole('row');
    // 1 fejléces sor + 4 adatsor = 5 sor
    expect(rows).toHaveLength(5);
  });

  test('Érmek száma', () => {
    render(<App />);
    const usaRow = screen.getByText('Egyesült Államok').closest('tr');
    const chinaRow = screen.getByText('Kína').closest('tr');
    const japanRow = screen.getByText('Japán').closest('tr');
    const australiaRow = screen.getByText('Ausztrália').closest('tr');

    expect(usaRow).toHaveTextContent('40');
    expect(usaRow).toHaveTextContent('44');
    expect(usaRow).toHaveTextContent('42');

    expect(chinaRow).toHaveTextContent('40');
    expect(chinaRow).toHaveTextContent('27');
    expect(chinaRow).toHaveTextContent('24');

    expect(japanRow).toHaveTextContent('20');
    expect(japanRow).toHaveTextContent('12');
    expect(japanRow).toHaveTextContent('13');

    expect(australiaRow).toHaveTextContent('18');
    expect(australiaRow).toHaveTextContent('19');
    expect(australiaRow).toHaveTextContent('16');
  });

  test('táblázat stílusok', () => {
    render(<App />);
    const table = screen.getByRole('table');
    expect(table).toHaveClass('table');
    expect(table).toHaveClass('table-striped');
  });
});
