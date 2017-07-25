/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const saveAboutThunk = (about) => (dispatch) => {
  axios.post(URL + 'db/save/about', {
    education: about.education,
    majors: about.majors,
    currentOccupation: about.currentOccupation,
    currentOccupationCity: about.currentOccupationCity,
    pastOccupations: about.pastOccupations
  })
    .then((success) => {
      console.log('success in save', success);
      dispatch({type: 'GET_USER_DATA'});
    })
    .catch((err) =>{
      console.log('error in saving about', err);
    });
};
export default saveAboutThunk;
