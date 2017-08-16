/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../info';

const toggleFilterCheckedThunk = (id) => (dispatch) => {
  console.log('I am toggling here right now', id);
  axios.post(URL + 'db/toggle/checked', {
    tagId: id
  })
  .then((response) => {
    console.log('backend response', response);
    // dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    dispatch({ type: 'GET_DISCOVER_POSTS_DONE', posts: response.data.posts, lastRefresh: response.data.lastRefresh });
    dispatch({type: 'HAS_MORE'});
  })
  .catch((err) =>{
    console.log('error in toggleFilterPref', err);
  });
};
export default toggleFilterCheckedThunk;
