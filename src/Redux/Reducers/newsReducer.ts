import { AnyAction } from "redux"
import { SET_NEWS } from "../Actions/actions"

const INITIAL_STATE = {
  news: []
}

const newsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload
      }
    default:
      return state  
  }
}

export default newsReducer;