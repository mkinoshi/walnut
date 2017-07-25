/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const createProfileThunk = (dispatch) => {
  axios.post(URL + 'db/save/iscreated', {
  })
    .then((response) => {
      console.log('Profile Done', response);
    })
    .catch((err) => {
      console.log('Profile Done Error', err);
    });
};
export default createProfileThunk;
