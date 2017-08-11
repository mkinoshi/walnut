
import axios from 'axios';
import URL from '../../info';

const removeUserPortTabsThunk = (i) => (dispatch) => {
  dispatch({type: 'REMOVE_TAB', index: i});
  axios.post(URL + 'db/update/removeportfoliotabs', {
    index: i
  })
    .then((response) => {
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default removeUserPortTabsThunk;
