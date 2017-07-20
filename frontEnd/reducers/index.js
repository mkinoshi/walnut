import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import quoteReducer from './quoteReducer';
import fbUserReducer from './fbUserReducer';
import createProfileReducer from './createProfileReducer';
import mapReducer from './mapReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  fbUserReducer: fbUserReducer,
  discoverReducer: discoverReducer,
  quoteReducer: quoteReducer,
  createProfileReducer: createProfileReducer,
  mapReducer: mapReducer,
  appReducer: appReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
