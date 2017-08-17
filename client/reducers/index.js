import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import directoryReducer from './directoryReducer';
import quoteReducer from './quoteReducer';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import deckReducer from './deckReducer';
import getCommunityReducer from './getCommunityReducer';
import newTagsReducer from './newTagsReducer';
import navBarReducer from './navBarReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  directoryReducer: directoryReducer,
  discoverReducer: discoverReducer,
  quoteReducer: quoteReducer,
  mapReducer: mapReducer,
  deckReducer: deckReducer,
  getCommunityReducer: getCommunityReducer,
  newTagsReducer: newTagsReducer,
  navBarReducer: navBarReducer,
  postReducer: postReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
