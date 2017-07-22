import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './modules/App/App_index';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import {apiMiddleware} from './reducers/apiMiddleware';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger, apiMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));
