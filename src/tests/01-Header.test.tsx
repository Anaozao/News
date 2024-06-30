import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRedux } from './helpers/renderWithRedux';

describe('Verifica o componente Header', () => {
  test('Verifica se tem o logo da trybe e o título Trybe News', () => {
    renderWithRedux(<App />)

    const logo = screen.getByTestId('logo-image');
    const title = screen.getByTestId('header-title')
    expect(logo).toHaveAttribute('alt', 'Logo da Trybe')
    expect(title).toHaveTextContent(/trybe news/i)
  })
})