
import axios from 'axios';
const URL = 'http://localhost:3000/';

const addUserPortTabsThunk = (data) => (dispatch) => {
  dispatch({type: 'ADD_TAB', data: data.data});
  axios.post(URL + 'db/update/portfoliotabs', {
    data: data.data
  })
    .then((response) => {
      console.log('response', response);
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default addUserPortTabsThunk;
