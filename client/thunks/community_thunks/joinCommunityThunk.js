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
      console.log('Community Joined', response);
      dispatch({type: 'GET_COMMUNITY_DONE', community: response.data.community});
    })
    .catch((err) => {
      console.log('probably failed to join community', err);
      dispatch({type: 'GET_COMMUNITY_ERROR'});
    });
};
export default joinCommunityThunk;
