
import axios from 'axios';
const URL = 'http://localhost:3000/';
import discoverLoadThunk from '../discover_thunks/discoverLoadThunk';

const newPostThunk = (postBody, postTags) => (dispatch) => {
  axios.post(URL + 'db/save/post', {
    postBody: postBody,
    postTags: postTags
  })
    .then(() => {
      dispatch(discoverLoadThunk());
    })
    .catch((err) =>{
      console.log('error in new post', err);
    });
};

export default newPostThunk;
