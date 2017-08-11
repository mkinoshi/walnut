
import axios from 'axios';
import URL from '../../info';

const addUserPortTabsThunk = (data) => (dispatch) => {
  dispatch({type: 'ADD_TAB', data: data.data});
  axios.post(URL + 'db/update/portfoliotabs', {
    data: data.data
  })
    .then((response) => {
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default addUserPortTabsThunk;
