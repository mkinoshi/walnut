/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const saveProjectsThunk = (projects) => (dispatch) => {
  axios.post(URL + 'db/save/projects', {
        // TODO: PROJECTS
  })
    .catch((err) =>{
      console.log('error in saving projects', err);
    });
};
export default saveProjectsThunk;
