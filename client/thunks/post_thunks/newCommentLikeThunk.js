
import axios from 'axios';
import URL from '../../info';

const newCommentLikeThunk = (postId, commentId) => (dispatch) => {
  axios.post(URL + 'db/save/commentlike', {
    postId: postId,
    commentId: commentId
  })
    .then(() => {
      // dispatch({type: 'GET_DISCOVER_INFO'})));
    });
};
export default newCommentLikeThunk;
