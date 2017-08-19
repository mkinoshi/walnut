/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const discoverLoadThunk = () => (dispatch) => {
  console.log('LOOOOOK', URL);
  dispatch({type: 'DISCOVER_IS_LOADING'});
  axios.get(URL + 'db/get/discoverinfo', {})
        .then((response) => {
          dispatch({
            type: 'GET_DISCOVER_DATA_DONE',
            otherTags: response.data.otherTags,
            otherFilters: response.data.otherFilters,
            posts: response.data.posts,
            lastRefresh: response.data.lastRefresh
          });
        })
        .catch((err) => {
          console.log('error in discoverThunk', err);
          dispatch({type: 'GET_DISCOVER_DATA_ERROR'});
        });
};

export default discoverLoadThunk;

