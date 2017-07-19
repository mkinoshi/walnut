import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import quoteReducer from './quoteReducer';
import userReducer from './userReducers';
import createProfileReducer from './createProfileReducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  discoverReducer: discoverReducer,
  quoteReducer: quoteReducer,
  createProfileReducer: createProfileReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
