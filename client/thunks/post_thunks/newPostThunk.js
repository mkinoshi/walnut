/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const newPostThunk = (postBody, postTags) => (dispatch) => {
  axios.post(URL + 'db/save/post', {
    postBody: postBody,
    postTags: postTags
  })
    .then(() => {
      dispatch({type: 'GET_DISCOVER_INFO'});
        // next(action);
    })
    .catch((err) =>{
      console.log('error in newComment', err);
    });
};

export default newPostThunk;
