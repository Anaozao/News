import { screen } from "@testing-library/react";
import App from "../App";
import { renderWithRedux } from "./helpers/renderWithRedux";
import * as actions from '../Redux/Actions/actions';
import { vi } from 'vitest';
import latest from './mocks/latestNewsMock.json'

describe('Verifica a página Home', () => {
  test('Verifica se a action getNews foi chamada ao renderizar o componente Home', async () => {

    const getNewsSpy = vi.spyOn(actions, 'getNews')
    getNewsSpy.mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'SET_NEWS', payload: [] });
    });

    renderWithRedux(<App />)

    expect(getNewsSpy).toBeCalledWith(1, 30, '', 'latest');
    getNewsSpy.mockRestore();
  })
  test('Verifica se ao carregar a página, são renderizdos 9 cards de notícias', async () => {

    vi.spyOn(actions, 'getNews').mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'SET_NEWS', payload: latest.items });
    });

    renderWithRedux(<App />)

    const cards = await screen.findAllByTestId('news-card')
    expect(cards).toHaveLength(9);

    vi.restoreAllMocks();
  })
  test('Verifica se, ao clicar em Mostrar mais, renderiza mais 9 cards', async () => {

    vi.spyOn(actions, 'getNews').mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'SET_NEWS', payload: latest.items });
    });

    const { user } = renderWithRedux(<App />);

    const cards = await screen.findAllByTestId('news-card')
    expect(cards).toHaveLength(9);

    const showMore = await screen.findByRole('button', {name: 'Mostrar mais'})
    await user.click(showMore)

    const moreCards = await screen.findAllByTestId('news-card')
    expect(moreCards).toHaveLength(18);
    vi.restoreAllMocks();
  })
  test('Verifica se, ao clicar em Mostrar mais 3 vezes, renderiza o botão Proxima página, que faz a chamada da api para a segunda pagina', async () => {

    const getNewsSpy2 = vi.spyOn(actions, 'getNews').mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'SET_NEWS', payload: latest.items });
    });

    const { user } = renderWithRedux(<App />);

    const showMore2 = await screen.findByRole('button', {name: 'Mostrar mais'})
    await user.click(showMore2)
    await user.click(showMore2)
    await user.click(showMore2)
    const nextPage = await screen.findByRole('button', {name: 'Próxima página'})
    await user.click(nextPage);

    expect(getNewsSpy2).toBeCalledWith(2, 30, '', 'latest');

    vi.restoreAllMocks();
  })
  test('Verifica se tem um header com os filtros e botão de pesquisa', async () => {
    renderWithRedux(<App />)

    const header = await screen.findByTestId('filters-header');
    const latest = await screen.findByTestId('latest-btn');
    const release = await screen.findByTestId('release-btn');
    const news = await screen.findByTestId('news-btn');
    const searchInput = await screen.findByTestId('search-input');
    const searchBtn = await screen.findByTestId('search-btn');
    expect(header).toBeInTheDocument();
    expect(latest).toBeInTheDocument();
    expect(release).toBeInTheDocument();
    expect(news).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    vi.restoreAllMocks();
  })
  test('Verifica a funcionalidade dos botões de categorias', async () => {

    const getNewsSpy3 = vi.spyOn(actions, 'getNews').mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'SET_NEWS', payload: latest.items });
    });

    const { user } = renderWithRedux(<App />)

    const latest2 = await screen.findByTestId('latest-btn');
    const release2 = await screen.findByTestId('release-btn');
    const news2 = await screen.findByTestId('news-btn');
    
    await user.click(release2);
    expect(getNewsSpy3).toBeCalledWith(1, 30, '', 'Release');
    
    await user.click(news2);
    expect(getNewsSpy3).toBeCalledWith(1, 30, '', 'Noticia');
    
    await user.click(latest2);
    expect(getNewsSpy3).toBeCalledWith(1, 30, '', 'latest');
    vi.restoreAllMocks();
  })
  test('Verifica a função de pesquisa', async () => {
    const getNewsSpy4 = vi.spyOn(actions, 'getNews')

    const { user } = renderWithRedux(<App />)

    const searchInput2 = await screen.findByTestId('search-input');
    const searchBtn2 = await screen.findByTestId('search-btn');

    await user.type(searchInput2, 'petrobras');
    await user.click(searchBtn2);

    expect(getNewsSpy4).toBeCalledWith(1, 30, '', 'latest');
    vi.restoreAllMocks();
  })
})