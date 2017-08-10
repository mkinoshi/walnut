/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import URL from '../../info';

const updateLocationThunk = (location) => (dispatch) => {
  if (location.length > 0) {
    axios.post(URL + 'db/update/location', {
      location: location
    })
    .then((response) => {
      dispatch({type: 'UPDATE_LOCATION_DONE', location: location});
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: 'UPDATE_LOCATION_DONE_ERR'});
    });
  } else {
    dispatch({type: 'UPDATE_LOCATION_DONE', location: location});
  }
};
export default updateLocationThunk;
