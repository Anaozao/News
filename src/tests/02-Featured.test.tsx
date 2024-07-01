import { renderWithRedux } from "./helpers/renderWithRedux";
import App from "../App";
import { screen } from "@testing-library/react";
import { vi } from 'vitest';
import latest from './mocks/latestNewsMock.json';
import * as actions from '../Redux/Actions/actions';

describe('Verifica o componente Featured', () => {
  test('Verifica se tem a imagem da notícia', async () => {

    vi.spyOn(actions, 'getNews').mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'SET_NEWS', payload: latest.items });
    });
    renderWithRedux(<App />);
    
    const image = await screen.findByTestId('featured-image');
    expect(image).toBeVisible();
    vi.restoreAllMocks();
  });
  test('Verifica se tem um botão com link para a notícia', async () => {
    renderWithRedux(<App />);

    const button = await screen.findByTestId('featured-link-btn');
    expect(button.firstChild).toHaveTextContent('Leia a notícia aqui')
  })
});