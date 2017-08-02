import axios from 'axios';
const URL = 'http://localhost:3000/';

const getUser = () => (dispatch) => {
  dispatch({type: 'USER_IS_FETCHING'});
  axios.get(URL + 'db/user')
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
    })
    .catch((err) =>{
      dispatch({type: 'GET_USER_ERROR'});
    });
};
export default getUser;
