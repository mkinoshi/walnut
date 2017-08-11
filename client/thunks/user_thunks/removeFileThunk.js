
import axios from 'axios';
import URL from '../../info';

const removeFileThunk = (tab, i) => (dispatch) => {
  dispatch({type: 'REMOVE_FILE', tab: tab, index: i});
  axios.post(URL + 'db/update/removeportfoliotabs', {
    tab: tab,
    index: i
  })
    .then((response) => {
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default removeFileThunk;
