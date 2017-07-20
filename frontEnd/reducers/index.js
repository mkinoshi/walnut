import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import quoteReducer from './quoteReducer';
import userReducer from './userReducer';
import createProfileReducer from './createProfileReducer';
import mapReducer from './mapReducer';
import appReducer from './appReducer';
import deckReducer from './deckReducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  discoverReducer: discoverReducer,
  quoteReducer: quoteReducer,
  createProfileReducer: createProfileReducer,
  mapReducer: mapReducer,
  appReducer: appReducer,
  deckReducer: deckReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
