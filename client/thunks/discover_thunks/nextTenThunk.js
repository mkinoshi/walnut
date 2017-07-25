/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const nextTenThunk = (lastOne) => (dispatch) => {
  axios.get(URL + 'db/get/next10' + '?lastOne=' + lastOne)
    .then((response) => {
      console.log('discover response', response);
      dispatch({type: 'GET_NEXT_TEN_DONE', filters: response.data.filters, posts: response.data.posts});
    })
    .catch((err) =>{
      console.log('error in newComment', err);
      dispatch({type: 'GET_NEXT_TEN_ERROR'});
    });
};
export default nextTenThunk;
