/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const saveContactThunk = (contact) => (dispatch) => {
  axios.post(URL + 'db/save/contact', {
    phones: contact.phones,
    email: contact.email
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    })
    .catch((err) =>{
      console.log('error in saving contact', err);
    });
};
export default saveContactThunk;
