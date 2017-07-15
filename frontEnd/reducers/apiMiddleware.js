import axios from 'axios';

export const apiMiddleware = store => next => action => {
  next(action);
  switch(action.type) {
    case 'NEW_COMMENT':
    // TODO postId needs to be action.Id
      axios.post(process.env.URL + 'db/newComment', {
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
      axios.post(process.env.URL + 'db/newPost', {
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
      axios.get(process.env.URL + '/toggleChecked', {
        tagName: action.name
      })
      .then((success) => {
        console.log('success in toggleChecked', success);
        next({type: 'STATE_REFRESH'});
      });
      break;
    case 'STATE_REFRESH':
      axios.get(process.env.URL + 'db/newComment')
      .then((response) => {
        store.dispatch({type: 'GET_DATA', data: response});
      })
      .catch((err) =>{
        console.log('error in newComment', err);
        store.dispatch({type: 'GET_DATA', data: false});
      });
      break;
    default:
      break;
  }
};
