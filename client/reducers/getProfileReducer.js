/**
 * Created by ebadgio on 7/20/17.
 */
const createProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ONE_PROFILE_DONE':
      console.log('action get', state, action.data);
      return action.data;
    case 'GET_ONE_PROFILE_ERROR':
      return state;
    default:
      return state;
  }
};


export default createProfileReducer;
