/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const getAllUsersMapThunk = (dispatch) => {
  axios.get(URL + 'db/get/allusersmap')
    .then((response) => {
      dispatch({type: 'GET_ALL_USERS_MAP_DONE', data: response.data});
    })
    .catch((err) =>{
      console.log('error in getting users', err);
      dispatch({type: 'GET_ALL_USERS_ERROR'});
    });
};
export default getAllUsersMapThunk;
