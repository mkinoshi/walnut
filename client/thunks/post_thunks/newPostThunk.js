
import axios from 'axios';
import URL from '../../info';

const newPostThunk = (postBody, postTags, newTags, lastRefresh, filters) => (dispatch) => {
  axios.post(URL + 'db/save/post', {
    postBody: postBody,
    postTags: postTags,
    newTags: newTags,
    lastRefresh: lastRefresh,
    filters: filters
  })
    .then((response) => {
      dispatch({ type: 'GET_DISCOVER_DATA_REFRESH', posts: response.data.posts, lastRefresh: response.data.lastRefresh});
      dispatch({type: 'MODAL_TOGGLE'});
    })
    .catch((err) =>{
      console.log('error in new post', err);
    });
};

export default newPostThunk;
