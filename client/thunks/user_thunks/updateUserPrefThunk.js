/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const updateUserPrefThunk = (data) => (dispatch) => {
  // dispatch({type: 'GET_FILTERS_UPDATE_FRONT', data: data});
  axios.post(URL + 'db/update/user', {
    data: data
  })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default updateUserPrefThunk;
