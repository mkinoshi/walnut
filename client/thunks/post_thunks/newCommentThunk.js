/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const newCommentThunk = (commentBody, postId) => (dispatch) => {
  axios.post(URL + 'db/save/comment', {
    commentBody: commentBody,
    postId: postId
  })
    .then(() => {
     // dispatch({type: 'GET_DISCOVER_INFO'})));
    })
    .catch((err) =>{
      console.log('error in newComment', err);
    });
};

export default newCommentThunk;
