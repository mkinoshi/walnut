/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const toggleFilterCheckedThunk = (id) => (dispatch) => {
  axios.post(URL + 'db/toggle/checked', {
    tagId: id
  })
  .then((response) => {
    console.log('backend response', response);
    dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    dispatch({ type: 'GET_DISCOVER_POSTS_DONE', posts: response.data.posts, lastRefresh: response.data.lastRefresh });
  })
  .catch((err) =>{
    console.log('error in toggleFilterPref', err);
  });
};
export default toggleFilterCheckedThunk;
