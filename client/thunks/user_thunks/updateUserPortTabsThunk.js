
import axios from 'axios';
import URL from '../../info';

const updateUserPortTabsThunk = (name, i) => (dispatch) => {
  dispatch({type: 'UPDATE_TAB', name: name, index: i});
  axios.post(URL + 'db/update/changeportfoliotabs', {
    name: name,
    index: i
  })
    .then((response) => {
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default updateUserPortTabsThunk;
