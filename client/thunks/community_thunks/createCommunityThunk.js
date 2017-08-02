/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const createCommunityThunk = (image, title, filters) => (dispatch) => {
  axios.post(URL + 'db/create/community', {
    title: title,
    image: image,
    defaultFilters: filters
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    })
    .catch((err) => {
      console.log('probably failed to create community', err);
    });
};
export default createCommunityThunk;
