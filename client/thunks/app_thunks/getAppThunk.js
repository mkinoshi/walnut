import axios from 'axios';
import URL from '../../info';

const getUser = () => (dispatch) => {
  dispatch({type: 'USER_IS_FETCHING'});
  axios.get(URL + 'db/user')
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
    })
    .catch((err) =>{
      dispatch({type: 'GET_USER_ERROR'});
    });
};
export default getUser;
