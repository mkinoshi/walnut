/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const getAllUsersThunk = (dispatch) => {
  axios.get(URL + 'db/get/allusers')
        .then((response) => {
          console.log('got all users', response);
          dispatch({type: 'GET_ALL_USERS_DONE', users: response.data.users});
        })
        .catch((err) =>{
          console.log('error in getting users', err);
          dispatch({type: 'GET_ALL_USERS_ERROR'});
        });
};
export default getAllUsersThunk;
