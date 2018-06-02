import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

import createStore from './redux-modules/store';

const dest = document.getElementById('app');
const store = createStore({});
const renderToDom = (Componnent) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} key="provider">
        <Componnent />
      </Provider>
    </AppContainer>,
    dest,
  );
};

renderToDom(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default; // eslint-disable-line global-require
    renderToDom(NextRoot);
  });
}
