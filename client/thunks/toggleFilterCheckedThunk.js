/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const toggleFilterCheckedThunk = (tagName, index) => (dispatch) => {
  dispatch({type: 'TOGGLE_FILTER_FRONT', index: index});
  axios.post(URL + 'db/toggle/checked', {
    tagName: tagName
  })
    .catch((err) =>{
      console.log('error in toggleFilterPref', err);
    });
};
export default toggleFilterCheckedThunk;
