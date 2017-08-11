/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const getAllUsersThunk = (dispatch) => {
  axios.get(URL + 'db/get/allusers')
        .then((response) => {
          dispatch({type: 'GET_ALL_USERS_DONE', users: response.data.users});
        })
        .catch((err) =>{
          console.log('error in getting users', err);
          dispatch({type: 'GET_ALL_USERS_ERROR'});
        });
};
export default getAllUsersThunk;
