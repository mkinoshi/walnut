/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const getUsersThunk = (dispatch) => {
  console.log('got to thunk');
  axios.get(URL + 'db/get/allusers')
    .then((response) => {
    //   console.log('response.data', response.data);
      dispatch({type: 'GET_ALL_USERS_DIRECTORY_DONE',
          users: response.data.data});
    })
    .catch((err) =>{
      console.log('error in getting users', err);
    //   dispatch({type: 'GET_NEXT_TEN_ERROR'});
    });
};
export default getUsersThunk;
