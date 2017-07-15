import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import newPostCommentReducer from './newPostCommentReducer';

const rootReducer = combineReducers({
  discoverReducer: discoverReducer,
  newPostCommentReducer: newPostCommentReducer,
  routing: routerReducer // this reducer is used by React Router in Redux
});

export default rootReducer;
