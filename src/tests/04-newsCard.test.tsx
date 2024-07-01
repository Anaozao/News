import { renderWithRedux } from "./helpers/renderWithRedux";
import App from "../App";
import { screen } from "@testing-library/react";
import { vi } from 'vitest';
import latest from './mocks/latestNewsMock.json';
import * as actions from '../Redux/Actions/actions';

describe('Verifica o componente NewsCard', () => {
  test('Verifica se ao clicar no botão de favoritar a notícia é salva no localstorage', async () => {

    vi.spyOn(actions, 'getNews').mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'SET_NEWS', payload: latest.items });
    });

    const { user } = renderWithRedux(<App />);
    
    const favBtn = await screen.findAllByTestId('fav-btn');

    expect(JSON.parse(localStorage.getItem('favorites') || '[]')).toHaveLength(0)
    
    await user.click(favBtn[1]);
    expect(JSON.parse(localStorage.getItem('favorites') || '[]')).toHaveLength(1)

    vi.restoreAllMocks();
  });
});