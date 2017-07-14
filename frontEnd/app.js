import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import appReducer from './reducers/appReducer';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const store = createStore(
  appReducer,
  applyMiddleware(createLogger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));
