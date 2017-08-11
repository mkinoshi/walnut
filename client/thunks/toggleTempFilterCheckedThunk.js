

import axios from 'axios';
import URL from '../info';

const toggleFilterCheckedThunk = (useFilters) => (dispatch) => {
  dispatch({ type: 'ADD_TEMP_FILTER', useFilters: useFilters });
  axios.post(URL + 'db/toggle/checkedtemp', {
    useFilters: useFilters
  })
        .then((response) => {
          console.log('backend response', response);
          dispatch({ type: 'GET_DISCOVER_POSTS_DONE', posts: response.data.posts });
          dispatch({type: 'HAS_MORE'});
        })
        .catch((err) => {
          console.log('error in toggleFilterPref', err);
        });
};
export default toggleFilterCheckedThunk;
