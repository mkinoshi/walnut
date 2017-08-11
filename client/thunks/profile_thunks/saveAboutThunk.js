/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveAboutThunk = (about) => (dispatch) => {
  console.log('save about thunk', about);
  axios.post(URL + 'db/save/about', {
    colleges: about.colleges,
    schools: about.schools,
    works: about.works,
    placesLived: about.places
  })
    .then((response) => {
      console.log('response', response);
      // dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    })
    .catch((err) =>{
      console.log('error in saving about', err);
    });
};
export default saveAboutThunk;
