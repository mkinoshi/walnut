/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const joinCommunityThunk = (id) => (dispatch) => {
  axios.post(URL + 'db/join/community', {
    communityId: id
  })
    .then((response) => {
      console.log('front end response', response);
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    })
    .catch((err) => {
      console.log('probably failed to join community', err);
    });
};
export default joinCommunityThunk;
