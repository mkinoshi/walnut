import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './modules/App/App_index';
import Auth from './modules/Auth/Auth_index';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
        <Auth />
    </MuiThemeProvider>
  </Provider>,
   document.getElementById('root'));
