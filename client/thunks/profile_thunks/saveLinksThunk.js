/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const saveLinksThunk = (links) => (dispatch) => {
  axios.post(URL + 'db/save/links', {
    linksArray: links
  })
    .then((success) => {
      dispatch({type: 'GET_USER_DATA'});
    })
    .catch((err) =>{
      console.log('error in saving links', err);
    });
};
export default saveLinksThunk;
