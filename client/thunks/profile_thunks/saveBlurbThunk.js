/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveBlurbThunk = (blurb) => (dispatch) => {
  axios.post(URL + 'db/save/blurb', {
    blurbBody: blurb
  })
    .then((success) => {
      console.log('success in save', success);
      dispatch({type: 'GET_USER_DATA'});
    })
    .catch((err) =>{
      console.log('error in saving blurb', err);
    });
};
export default saveBlurbThunk;
