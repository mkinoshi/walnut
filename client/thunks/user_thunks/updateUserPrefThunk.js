/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

import URL from '../../info';

const updateUserPrefThunk = (preference) => (dispatch) => {
  // dispatch({type: 'GET_FILTERS_UPDATE_FRONT', data: data});
  dispatch({type: 'HOLD_DISCOVER'});
  axios.post(URL + 'db/update/user', {
    data: preference
  })
    .then((response) => {
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
      // dispatch({type: 'DISCOVER_READY'});
      // .push('/app/community/' + community.title.split(' ').join('') + '/discover');
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default updateUserPrefThunk;
