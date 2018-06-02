/* eslint-disable no-underscore-dangle, global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiClient from 'utils/apiClient';

// Add custom params to redux-thunk
const thunk = thunkMiddleware.withExtraArgument({
  api: apiClient,
});

const middleware = [
  thunk,
];

let enhancer;

// REDUX_DEVTOOLS
if (__DEVELOPMENT__ && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: document.title,
  }) || compose;
  enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  );
  console.log('Open ReduxDevTools for debuging');
} else {
  enhancer = applyMiddleware(...middleware);
}

const configureStore = (initialState) => {
  const rootReducer = require('./combine').default;
  const store = createStore(rootReducer, initialState, enhancer);

  if (__DEVELOPMENT__ && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./combine', () => {
      const nextRootReducer = require('./combine').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  // apiClient._init();
  return store;
};

export default configureStore;