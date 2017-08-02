/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';
import userDataThunk from '../user_thunks/userDataThunk';

const createProfileThunk = (dispatch) => {
  axios.post(URL + 'db/save/iscreated', {
  })
    .then((response) => {
      userDataThunk(dispatch);
    })
    .catch((err) => {
      console.log('Profile Done Error', err);
    });
};
export default createProfileThunk;
