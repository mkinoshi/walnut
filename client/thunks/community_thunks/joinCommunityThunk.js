/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const joinCommunityThunk = (id) => (dispatch) => {
  axios.post(URL + 'db/join/community', {
    communityId: id
  })
    .then((response) => {
      console.log('response', response);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
    })
    .catch((err) => {
      console.log('probably failed to join community', err);
    });
};
export default joinCommunityThunk;
