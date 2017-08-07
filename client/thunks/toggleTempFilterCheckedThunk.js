

import axios from 'axios';
const URL = 'http://localhost:3000/';

const toggleFilterCheckedThunk = (useFilters) => (dispatch) => {
  dispatch({ type: 'ADD_TEMP_FILTER', useFilters: useFilters });
  axios.post(URL + 'db/toggle/checkedtemp', {
    useFilters: useFilters
  })
        .then((response) => {
          console.log('backend response', response);
          dispatch({ type: 'GET_DISCOVER_POSTS_DONE', posts: response.data.posts });
        })
        .catch((err) => {
          console.log('error in toggleFilterPref', err);
        });
};
export default toggleFilterCheckedThunk;
