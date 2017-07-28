/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const userDataThunk = () => (dispatch) => {
  axios.get(URL + 'db/user')
    .then((response) => {
      console.log('got user:', response);
      dispatch({type: 'GET_USER_DATA_DONE', data: response.data.data});
    })
    .catch((err) => {
      console.log('getting error in login', err);
      dispatch({type: 'GET_USER_DATA_ERROR'});
    });
};

export default userDataThunk;
