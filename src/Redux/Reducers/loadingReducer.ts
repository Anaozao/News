import { AnyAction } from "redux";
import { SET_LOADING } from "../Actions/actions";

const INITIAL_STATE = {
  loading: false
};

const loadingReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export default loadingReducer;