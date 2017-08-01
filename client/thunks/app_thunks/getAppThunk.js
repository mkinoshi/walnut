import axios from 'axios';
const URL = 'http://localhost:3000/';

const getApp = (dispatch) => {
  dispatch({type: 'COMMUNITIES_IS_FETCHING'});
  dispatch({type: 'USER_IS_FETCHING'});
  axios.get(URL + 'db/get/app')
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch({type: 'GET_ALL_COMMUNITIES_DONE', communities: response.data.communities});
      dispatch({type: 'GET_USER_DONE', user: response.data.user});
    })
    .catch((err) =>{
      dispatch({type: 'GET_ALL_COMMUNITIES_ERROR'});
    });
};
export default getApp;
