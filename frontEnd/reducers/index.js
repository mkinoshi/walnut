import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';

const rootReducer = combineReducers({
  discoverReducer: discoverReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
