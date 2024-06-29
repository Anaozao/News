import { AnyAction } from "redux"
import { SET_FAVORITES, SET_NEWS } from "../Actions/actions"

const INITIAL_STATE = {
  news: [],
  favorites: []
}

const newsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload
      }
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      }  
    default:
      return state  
  }
}

export default newsReducer;