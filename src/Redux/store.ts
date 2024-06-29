import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import newsReducer from './Reducers/newsReducer'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

const store = createStore(newsReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;