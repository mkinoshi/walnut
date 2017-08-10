
import axios from 'axios';
const URL = 'http://localhost:3000/';

const newPostThunk = (postBody, postTags, lastRefresh) => (dispatch) => {
  axios.post(URL + 'db/save/post', {
    postBody: postBody,
    postTags: postTags,
    lastRefresh: lastRefresh
  })
    .then((response) => {
      console.log('new post', response);
      dispatch({ type: 'GET_DISCOVER_DATA_REFRESH', posts: response.data.posts, lastRefresh: response.data.lastRefresh });
    })
    .catch((err) =>{
      console.log('error in new post', err);
    });
};

export default newPostThunk;
