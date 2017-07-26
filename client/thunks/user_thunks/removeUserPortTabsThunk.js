
import axios from 'axios';
const URL = 'http://localhost:3000/';

const removeUserPortTabsThunk = (i) => (dispatch) => {
  dispatch({type: 'REMOVE_TAB', index: i});
  axios.post(URL + 'db/update/removeportfoliotabs', {
    index: i
  })
    .then((response) => {
      console.log('response', response);
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default removeUserPortTabsThunk;
