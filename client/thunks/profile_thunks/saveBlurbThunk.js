/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveBlurbThunk = (blurb) => (dispatch) => {
  axios.post(URL + 'db/save/blurb', {
    blurbBody: blurb
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    })
    .catch((err) =>{
      console.log('error in saving blurb', err);
    });
};
export default saveBlurbThunk;
