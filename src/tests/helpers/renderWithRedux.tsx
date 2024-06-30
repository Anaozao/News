import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';
import rootReducer from "../../Redux/Reducers/rootReducer";
import thunk from "redux-thunk";
import userEvent from '@testing-library/user-event';

type Options = {
  initialEntries?: string[];
  initialState?: any;
  store?: Store;
};

function withRedux(component: React.ReactElement, store: Store) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

export function renderWithRedux(component: React.ReactElement, options: Options = {}) {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = options;


  return {
    ...render(withRedux(component, store)),
    store,
    user: userEvent.setup(),
  };
}