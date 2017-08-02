/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveTagsThunk = (tags) => (dispatch) => {
  axios.post(URL + 'db/save/tags', {
    tagsArray: tags
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    })
    .catch((err) =>{
      console.log('error in saving tags', err);
    });
};
export default saveTagsThunk;
