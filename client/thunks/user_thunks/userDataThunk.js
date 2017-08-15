
import axios from 'axios';
import URL from '../../info';

const userDataThunk = () => (dispatch) => {
  axios.get(URL + 'db/user')
    .then((response) => {
      console.log('got user:', response);
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
      // TODO dispatch the same action as inside the join conversation thunk
    })
    .catch((err) => {
      console.log('getting error in login', err);
      dispatch({type: 'GET_USER_DATA_ERROR'});
    });
};

export default userDataThunk;
