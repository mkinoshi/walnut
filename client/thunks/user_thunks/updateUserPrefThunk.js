/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';
import userDataThunk from './userDataThunk';
import discoverLoadThunk from '../discover_thunks/discoverLoadThunk';

const updateUserPrefThunk = (data) => (dispatch) => {
  // dispatch({type: 'GET_FILTERS_UPDATE_FRONT', data: data});
  axios.post(URL + 'db/update/user', {
    data: data
  })
    .then((response) => {
      console.log('response', response);
      userDataThunk(dispatch);
      discoverLoadThunk(dispatch);
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default updateUserPrefThunk;
