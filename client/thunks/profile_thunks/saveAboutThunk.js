/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveAboutThunk = (about) => (dispatch) => {
  axios.post(URL + 'db/save/about', {
    colleges: about.colleges,
    schools: about.schools,
    works: about.works,
    placesLived: about.places
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', data: response.data.user});
    })
    .catch((err) =>{
      console.log('error in saving about', err);
    });
};
export default saveAboutThunk;
