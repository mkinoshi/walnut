/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const newTagThunk = (tag) => (dispatch) => {
  axios.post(URL + 'db/save/tag', {
    tag: tag
  })
    .then(() => {
      dispatch({type: 'GET_DISCOVER_INFO'});
    })
    .catch((err) => {
      console.log('error in newTag', err);
    });
};
export default newTagThunk;
