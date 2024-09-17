import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function typeIntoForm({ nev, db }) {
  const nameElement = screen.getByLabelText("Ország neve:")
  const countElement = screen.getByLabelText("Versenyzők száma:")
  if (nev) {
    await userEvent.type(nameElement, nev)
  }
  if (db) {
    await userEvent.type(countElement, db)
  }
  return { nameElement, countElement }
}

async function clickOnSubmitButton() {
  await userEvent.click(screen.getByRole('button', { name: "Hozzáadás" }))
}

beforeEach(() => {
  render(<App />);
})

describe('Képernyő elemek', () => {
  test('Vannak üres input mezők', () => {
    expect(screen.getByLabelText("Ország neve:").value).toBe("");
    expect(screen.getByLabelText("Versenyzők száma:").value).toBe("");
  });
  test('Be lehet írni a nevet', async () => {
    const { nameElement } = await typeIntoForm({ nev: "Kis Béla" })
    expect(nameElement.value).toBe("Kis Béla")
  })
  test('Be lehet írni a versenyzők számát egy szám típusú mezőbe', async () => {
    const { countElement } = await typeIntoForm({ db: "51" })
    expect(countElement.value).toBe("51")
    expect(countElement.type).toBe("number")
  })
  test('Van Hozzáadás gomb', () => {
    const submitButton = screen.getByRole('button', { name: "Hozzáadás" })
    expect(submitButton).toBeInTheDocument()
  })
})

describe('Hibakezelés', () => {
  test('Hibaüzenet 3 karakternél rövidebb név esetén', async () => {
    await typeIntoForm({ nev: "aa" })
    await clickOnSubmitButton();
    expect(await screen.findByText("Az ország neve nem lehet 3 karakternél rövidebb!")).toBeInTheDocument()
  })
  test('Hibaüzenet hibás szám esetén', async () => {
    await typeIntoForm({ nev: "aaa", db: "" })
    await clickOnSubmitButton();
    expect(await screen.findByText("A versenyzők száma 1 és 600 közötti szám lehet!")).toBeInTheDocument()
    await typeIntoForm({ nev: "aaa", db: "0" })
    await clickOnSubmitButton();
    expect(await screen.findByText("A versenyzők száma 1 és 600 közötti szám lehet!")).toBeInTheDocument()
    await typeIntoForm({ nev: "aaa", db: "601" })
    await clickOnSubmitButton();
    expect(await screen.findByText("A versenyzők száma 1 és 600 közötti szám lehet!")).toBeInTheDocument()
  })
})

describe('Lista', () => {
  test('A 200 fő alatti részvétel adatai helyesen megjelennek', async () => {
    await typeIntoForm({ nev: "Magyarország", db: "178" })
    await clickOnSubmitButton();
    const listElement = await screen.findByRole("listitem")
    expect(listElement.textContent).toBe("Magyarország: 178")
    expect(listElement.classList).not.toContain('text-danger')
  })
  test('A 200 fő feletti részvétel adatai helyesen megjelennek', async () => {
    await typeIntoForm({ nev: "Japán", db: "447" })
    await clickOnSubmitButton();
    const listElement = await screen.findByRole("listitem")
    expect(listElement.textContent).toBe("Japán: 447")
    expect(listElement.classList).toContain('text-danger')
  })
})