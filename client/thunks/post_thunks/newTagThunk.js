/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const newTagThunk = (tag) => (dispatch) => {
  axios.post(URL + 'db/save/tag', {
    tag: tag
  })
    .then((response) => {
      dispatch({type: 'NEW_TAG', tag: response.data.tag});
    })
    .catch((err) => {
      console.log('error in newTag', err);
      dispatch({type: 'NEW_TAG_ERROR'});
    });
};
export default newTagThunk;
