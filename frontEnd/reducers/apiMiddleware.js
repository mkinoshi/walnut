import axios from 'axios';
const URL = 'http://localhost:3000/';

export const apiMiddleware = store => next => action => {
  next(action);
  switch(action.type) {
    case 'GET_USER_DATA':
      axios.get(URL + 'db/user')
           .then((response) => {
             store.dispatch({type: 'GET_USER_DATA_DONE', data: response.data.data});
           })
           .catch((err) => {
             console.log('getting error in login');
             store.dispatch({type: 'GET_DATA_ERROR'});
           });
      break;
    case 'NEW_COMMENT':
      axios.post(URL + 'db/newComment', {
        commentBody: action.commentBody,
        postId: action.postId
      })
      .then((response) => {
        next(action(store.dispatch({type: 'STATE_REFRESH'})));
        next(action);
      })
      .catch((err) =>{
        console.log('error in newComment', err);
      });
      break;
    case 'NEW_POST':
      axios.post(URL + 'db/newPost', {
        postBody: action.postBody,
        postTags: action.postTags
      })
      .then(() => {
        next(action(store.dispatch({type: 'STATE_REFRESH'})));
        next(action);
      })
      .catch((err) =>{
        console.log('error in newComment', err);
      });
      break;
    case 'TOGGLE_FILTER_CHECKED':
      store.dispatch({type: 'TOGGLE_FILTER_FRONT', index: action.index});
      axios.post(URL + 'db/toggleChecked', {
        tagName: action.name
      })
      .catch((err) =>{
        console.log('error in toggleFilterPref', err);
      });
      break;
    case 'GET_QUOTE':
      axios.get(URL + 'db/getQuote')
      .then((response) => {
        store.dispatch({type: 'UPDATE_QUOTE', data: response.data});
      })
      .catch((err) =>{
        console.log('error in newComment', err);
        store.dispatch({type: 'UPDATE_QUOTE_ERROR'});
      });
      break;
    case 'NEW_LIKE':
      axios.post(URL + 'db/newPostLike', {
        postId: action.postId,
      })
      .then(() => {
        next(action(store.dispatch({type: 'STATE_REFRESH'})));
        next(action);
      });
      break;
    case 'NEW_COMMENT_LIKE':
      axios.post(URL + 'db/newCommentLike', {
        postId: action.postId,
        commentId: action.commentId
      })
      .then(() => {
        next(action(store.dispatch({type: 'STATE_REFRESH'})));
        next(action);
      });
      break;

    case 'STATE_REFRESH':
      axios.get(URL + 'db/getDiscoverInfo')
      .then((response) => {
        store.dispatch({type: 'GET_DATA', data: response.data});
      })
      .catch((err) =>{
        console.log('error in newComment', err);
        store.dispatch({type: 'GET_DATA_ERROR'});
      });
      break;
    default:
      break;
  }
};
