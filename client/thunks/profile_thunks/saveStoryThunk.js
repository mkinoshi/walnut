/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const saveStoryThunk = (story) => (dispatch) => {
  axios.post(URL + 'db/save/story', {
        // TODO: STORY
  })
    .catch((err) =>{
      console.log('error in saving story', err);
    });
};
export default saveStoryThunk;
