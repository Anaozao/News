import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export type ReduxState = {
  newsReducer: {
    news: NewsType[];
    favorites: NewsType[]
  }
  loadingReducer: {
    loading: boolean,
  }
}

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

export type ApiType = {
  count: number,
  page: number,
  totalPages: number,
  nextPage: number,
  previousPage: number,
  showingFrom: number,
  showingTo: number,
  items: NewsType[],
}

export type NewsType = {
  id: number,
  tipo: string,
  titulo: string,
  introducao: string,
  data_publicacao: string,
  produto_id: number,
  produtos: string,
  editoriais: string,
  imagens: string,
  produtos_relaciocados: string,
  destaque: boolean,
  link: string,
}