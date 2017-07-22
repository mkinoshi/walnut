import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import quoteReducer from './quoteReducer';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import deckReducer from './deckReducer';
import getCommunityReducer from './getCommunityReducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  discoverReducer: discoverReducer,
  quoteReducer: quoteReducer,
  mapReducer: mapReducer,
  deckReducer: deckReducer,
  getCommunityReducer: getCommunityReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
