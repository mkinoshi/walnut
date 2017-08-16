import axios from 'axios';
import URL from '../../info';

const joinConversationThunk = (postId) => (dispatch) => {
  axios.post(URL + 'db/save/joinconversation', {
    postId: postId,
  })
    .then((response) => {
        // dispatch get user data refresh only with new conversations populated
      console.log('front end save response', response.data.success);
    })
    .catch((err)=> {
      console.log('error inside join conversation thunk', err);
    });
};
export default joinConversationThunk;
