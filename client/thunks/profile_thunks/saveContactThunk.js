/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveContactThunk = (contact) => (dispatch) => {
  axios.post(URL + 'db/save/contact', {
    email: contact.email,
    address: contact.address,
    phone: contact.phone
  })
    .then((success) => {
      console.log('success in save', success);
      dispatch({type: 'GET_USER_DATA'});
    })
    .catch((err) =>{
      console.log('error in saving contact', err);
    });
};
export default saveContactThunk;
