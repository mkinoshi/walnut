/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const nextTenThunk = (lastOne, lastRefresh) => (dispatch) => {
  axios.get(URL + 'db/get/next10' + '?lastOne=' + lastOne + '&lastRefresh=' + lastRefresh)
    .then((response) => {
      dispatch({type: 'GET_NEXT_TEN_DONE',
          defaultFilters: response.data.defaultFilters,
          otherFilters: response.data.defaultFilters,
          posts: response.data.posts});
    })
    .catch((err) =>{
      console.log('error in nextTen', err);
      dispatch({type: 'GET_NEXT_TEN_ERROR'});
    });
};
export default nextTenThunk;
