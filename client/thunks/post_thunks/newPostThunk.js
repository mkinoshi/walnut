/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';
import discoverLoadThunk from '../discover_thunks/discoverLoadThunk';

const newPostThunk = (postBody, postTags, postNewTags) => (dispatch) => {
  axios.post(URL + 'db/save/post', {
    postBody: postBody,
    postTags: postTags,
    postNewTags: postNewTags
  })
    .then((newPost) => {
      console.log('new Post', newPost);
      discoverLoadThunk(dispatch);
    })
    .catch((err) =>{
      console.log('error in newComment', err);
    });
};

export default newPostThunk;
