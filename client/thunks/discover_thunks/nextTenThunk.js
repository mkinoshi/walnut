/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const nextTenThunk = (lastOne, lastRefresh, filters) => (dispatch) => {
  axios.get(URL + 'db/get/next10' + '?lastOne=' + lastOne + '&lastRefresh=' + lastRefresh + '&filters=' + JSON.stringify(filters))
    .then((response) => {
      dispatch({type: 'GET_NEXT_TEN_DONE',
          otherTags: response.data.otherTags,
          otherFilters: response.data.otherTags,
          posts: response.data.posts});
    })
    .catch((err) =>{
      console.log('error in nextTen', err);
      dispatch({type: 'GET_NEXT_TEN_ERROR'});
    });
};
export default nextTenThunk;
