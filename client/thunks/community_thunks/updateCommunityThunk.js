import axios from 'axios';
import URL from '../../info';

const createCommunityThunk = (image, title, oldFilters, newFilters, admins) => (dispatch) => {
  axios.post(URL + 'db/update/community', {
    title: title,
    image: image,
    oldFilters: oldFilters,
    newFilters: newFilters,
    admins: admins
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.user});
    })
    .catch((err) => {
      console.log('probably failed to create community', err);
    });
};
export default createCommunityThunk;
