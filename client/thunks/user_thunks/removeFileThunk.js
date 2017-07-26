
import axios from 'axios';
const URL = 'http://localhost:3000/';

const removeFileThunk = (tab, i) => (dispatch) => {
  dispatch({type: 'REMOVE_FILE', tab: tab, index: i});
  axios.post(URL + 'db/update/removeportfoliotabs', {
    tab: tab,
    index: i
  })
    .then((response) => {
      console.log('response', response);
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default removeFileThunk;
