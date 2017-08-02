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
      console.log(response);
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
    })
    .catch((err) => {
      console.log('Profile Done Error', err);
    });
};
export default createProfileThunk;
