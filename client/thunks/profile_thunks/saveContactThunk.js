/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveContactThunk = (contact) => (dispatch) => {
  axios.post(URL + 'db/save/contact', {
    phones: contact.phones,
    email: contact.email
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', data: response.data.user});
    })
    .catch((err) =>{
      console.log('error in saving contact', err);
    });
};
export default saveContactThunk;
