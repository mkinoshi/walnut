/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const createCommunityThunk = (title, image) => (dispatch) => {
  axios.post(URL + 'db/create/community', {
    title: title,
    image: image
  })
    .then((response) => {
      console.log('Community Created', response);
      dispatch({type: 'GET_COMMUNITY_DONE', community: response.data.community});
    })
    .catch((err) => {
      console.log('probably failed to create community', err);
      dispatch({type: 'GET_COMMUNITY_ERROR'});
    });
};
export default createCommunityThunk;
