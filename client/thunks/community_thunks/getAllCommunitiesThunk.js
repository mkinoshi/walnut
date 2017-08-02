/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const getAllCommunitiesThunk = () => (dispatch) => {
  dispatch({type: 'COMMUNITIES_IS_FETCHING'});
  axios.get(URL + 'db/get/allcommunities')
    .then((response) => {
      dispatch({type: 'GET_ALL_COMMUNITIES_DONE', communities: response.data});
    })
    .catch((err) =>{
      console.log('error in getting users', err);
      dispatch({type: 'GET_ALL_COMMUNITIES_ERROR'});
    });
};
export default getAllCommunitiesThunk;
