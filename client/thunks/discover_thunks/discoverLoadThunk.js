/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const discoverLoadThunk = (dispatch) => {
  axios.get(URL + 'db/get/discoverinfo', {})
        .then((response) => {
          console.log('discover response', response);
          dispatch({
            type: 'GET_DISCOVER_DATA_DONE',
            filters: response.data.filters,
            posts: response.data.posts
          });
        })
        .catch((err) => {
          console.log('error in newComment', err);
          dispatch({type: 'GET_DISCOVER_DATA_ERROR'});
        });
};

export default discoverLoadThunk;

