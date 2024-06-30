import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({newsReducer, loadingReducer})

export default rootReducer;