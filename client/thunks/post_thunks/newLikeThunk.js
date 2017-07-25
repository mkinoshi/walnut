/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const newLikeThunk = (postId) => (dispatch) => {
  axios.post(URL + 'db/save/postlike', {
    postId: postId,
  })
    .then(() => {
      // dispatch({type: 'GET_DISCOVER_INFO'});
    });
};
export default newLikeThunk;
