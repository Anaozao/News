import { fetchNews } from "../../Utils/API"
import { Dispatch, NewsType } from "../../types"

export const SET_NEWS = 'SET_NEWS'
export const SET_FAVORITES = 'SET_FAVORITES'
export const SET_LOADING = 'SET_LOADING'

export const setLoading = (payload: boolean) => {
  return {
    type: SET_LOADING,
    payload,
  }
}

const setNews = (payload: NewsType | []) => {
  return {
    type: SET_NEWS,
    payload,
  }
}

export const getNews = (page: number, qtd: number, search: string, tipo: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    const response = await fetchNews(page, qtd, search, tipo);
    const data = response.items
    dispatch(setNews(data))
    dispatch(setLoading(false))
  }
}

export const setFavorites = (payload: NewsType[]) => {
  return {
    type: SET_FAVORITES,
    payload,
  }
}