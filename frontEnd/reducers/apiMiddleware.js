import axios from 'axios';
const URL = 'http://localhost:3000/';

export const apiMiddleware = store => next => action => {
  next(action);
  switch(action.type) {
    case 'NEW_COMMENT':
    // TODO postId needs to be action.Id
      axios.post(URL + 'db/newComment', {
        commentBody: action.comment,
        postId: action.postId
      })
      .then((response) => {
        console.log('new comment resp', response);
        next({type: 'STATE_REFRESH'});
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
      .then((response) => {
        console.log('success in newComment', response);
        next({type: 'STATE_REFRESH'});
      })
      .catch((err) =>{
        console.log('error in newComment', err);
      });
      break;
    case 'TOGGLE_FILTER_CHECKED':
      axios.post(URL + '/toggleChecked', {
        tagName: action.name
      })
      .then((success) => {
        console.log('success in toggleChecked', success);
        next({type: 'STATE_REFRESH'});
      });
      break;
    case 'GET_QUOTE':
      axios.get(URL + 'db/getQuote')
      .then((response) => {
        console.log('resdhufhsiughsudihusdhf', response.data);
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
        next({type: 'STATE_REFRESH'});
      });
      break;
    case 'STATE_REFRESH':
      axios.get(URL + 'db/getDiscoverInfo')
      .then((response) => {
        console.log('resdhufhsiughsudihusdhf', response.data);
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
