/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';
import userDataThunk from '../../thunks/user_thunks/userDataThunk';

const joinCommunityThunk = (id) => (dispatch) => {
  axios.post(URL + 'db/join/community', {
    communityId: id
  })
    .then((response) => {
      console.log('Community Joined', response);
      discoverLoadThunk(dispatch);
      userDataThunk(dispatch);
    })
    .catch((err) => {
      console.log('probably failed to join community', err);
    });
};
export default joinCommunityThunk;
