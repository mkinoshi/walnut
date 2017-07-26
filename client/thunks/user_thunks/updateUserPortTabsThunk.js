
import axios from 'axios';
const URL = 'http://localhost:3000/';

const updateUserPortTabsThunk = (name, i) => (dispatch) => {
  dispatch({type: 'UPDATE_TAB', name: name, index: i});
  axios.post(URL + 'db/update/changeportfoliotabs', {
    name: name,
    index: i
  })
    .then((response) => {
      console.log('response', response);
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default updateUserPortTabsThunk;
