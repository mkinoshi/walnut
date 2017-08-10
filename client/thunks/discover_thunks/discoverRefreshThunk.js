
import axios from 'axios';
import URL from '../../info';

const discoverRefreshThunk = (lastRefresh) => (dispatch) => {
  axios.get(URL + 'db/get/discoverrefresh?lastRefresh=' + lastRefresh)
    .then((response) => {
      console.log('discover refresh thunk response', response);
      dispatch({
        type: 'GET_DISCOVER_DATA_REFRESH',
        posts: response.data.posts,
        lastRefresh: response.data.lastRefresh
      });
    })
    .catch((err) => {
      console.log('error in discoverThunk', err);
      dispatch({ type: 'GET_DISCOVER_DATA_ERROR' });
    });
};

export default discoverRefreshThunk;

