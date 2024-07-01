import latest from './latestNewsMock.json';

const storeStateMock = {
  newsReducer: {
    news: latest.items,
    favorites: []
  },
  loadingReducer: {
    loading: false,
  }
};

export default storeStateMock;