import { combineReducers } from "redux";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({newsReducer})

export default rootReducer;