/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const createProfileThunk = () => (dispatch) => {
  axios.post(URL + 'db/save/iscreated', {
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
    })
    .catch((err) => {
      console.log('Profile Done Error', err);
    });
};
export default createProfileThunk;
