/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const getAllCommunitiesThunk = (dispatch) => {
  axios.get(URL + 'db/get/allcommunities')
    .then((response) => {
        // console.log('deck middleware', response);
        // store.dispatch({type: 'GET_ALL_USERS_DONE', data: response.data.data});
      dispatch({type: 'GET_ALL_COMMUNITIES_DONE', communities: response.data});
    })
    .catch((err) =>{
      console.log('error in getting users', err);
      dispatch({type: 'GET_ALL_COMMUNITIES_ERROR'});
    });
};
export default getAllCommunitiesThunk;
