/**
 * Created by ebadgio on 7/24/17.
 */
import axios from 'axios';
const URL = 'http://localhost:3000/';

const updateUserCommunityThunk = (community) => (dispatch) => {
  dispatch({type: 'HOLD_DISCOVER'});
  console.log('yeyeryeyeyeyeyeyeyeyeyey', community._id);
  axios.post(URL + 'db/toggle/community', {
    communityId: community._id
  })
    .then((response) => {
      console.log(community);
      console.log(response.data);
      dispatch({type: 'GET_USER_DATA_DONE', user: response.data.data});
      dispatch({type: 'DISCOVER_READY'});
      // .push('/app/community/' + community.title.split(' ').join('') + '/discover');
    })
    .catch((err) =>{
      console.log('error in newTag', err);
    });
};
export default updateUserCommunityThunk;
