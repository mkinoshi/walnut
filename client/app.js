import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './modules/App/App_index';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));
