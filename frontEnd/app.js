import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import appReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import {apiMiddleware} from './reducers/apiMiddleware';

const store = createStore(
  appReducer,
  applyMiddleware(createLogger, apiMiddleware)
);

store.dispatch({type: 'STATE_REFRESH'});
store.dispatch({type: 'GET_USER_DATA'});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));
