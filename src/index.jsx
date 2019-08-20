import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/client/App';

import store from './state/store';

// require('$assets/fonts.css');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
