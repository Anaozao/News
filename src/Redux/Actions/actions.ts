import { fetchNews } from "../../Utils/API"
import { Dispatch, NewsType } from "../../types"

export const SET_NEWS = 'SET_NEWS'

const setNews = (payload: NewsType) => {
  return {
    type: SET_NEWS,
    payload,
  }
}

export const getNews = (page = 1, qtd = 30, search = '') => {
  return async (dispatch: Dispatch) => {
    const response = await fetchNews(page, qtd, search);
    const data = response.items
    dispatch(setNews(data))
  }
}