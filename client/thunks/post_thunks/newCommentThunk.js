/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import discoverLoadThunk from '../discover_thunks/discoverLoadThunk';
import URL from '../../info';

const newCommentThunk = (commentBody, postId) => (dispatch) => {
  axios.post(URL + 'db/save/comment', {
    commentBody: commentBody,
    postId: postId
  })
    .then(() => {
      discoverLoadThunk(dispatch);
    })
    .catch((err) =>{
      console.log('error in newComment', err);
    });
};

export default newCommentThunk;
