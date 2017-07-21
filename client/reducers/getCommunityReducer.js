/**
 * Created by ebadgio on 7/20/17.
 */
const getCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_COMMUNITY_DONE':
      console.log('action community', state, action.community);
      return action.community;
    case 'GET_COMMUNITY_ERROR':
      return state;
    default:
      return state;
  }
};


export default getCommunityReducer;
