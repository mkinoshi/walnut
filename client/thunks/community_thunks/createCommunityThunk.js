/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';
import userDataThunk from '../../thunks/user_thunks/userDataThunk';

const createCommunityThunk = (image, title, filters) => (dispatch) => {
  axios.post(URL + 'db/create/community', {
    title: title,
    image: image,
    defaultFilters: filters
  })
    .then((response) => {
      console.log('Community Created', response);
      discoverLoadThunk(dispatch);
      userDataThunk(dispatch);
    })
    .catch((err) => {
      console.log('probably failed to create community', err);
    });
};
export default createCommunityThunk;
