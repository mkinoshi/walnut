import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import directoryReducer from './directoryReducer';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import deckReducer from './deckReducer';
import getCommunityReducer from './getCommunityReducer';
import newTagsReducer from './newTagsReducer';
import navBarReducer from './navBarReducer';
import postReducer from './postReducer';
import conversationReducer from './conversationReducer';

const rootReducer = combineReducers({
  conversationReducer: conversationReducer,
  userReducer: userReducer,
  directoryReducer: directoryReducer,
  discoverReducer: discoverReducer,
  mapReducer: mapReducer,
  deckReducer: deckReducer,
  getCommunityReducer: getCommunityReducer,
  newTagsReducer: newTagsReducer,
  navBarReducer: navBarReducer,
  postReducer: postReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
