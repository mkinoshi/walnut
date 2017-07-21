

const createProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PROFILE_DATA_DONE':
      console.log('action', stkm);
      return action.data;
    case 'GET_PROFILE_DATA_ERROR':
      return state;
    default:
      return state;
  }
};


export default createProfileReducer;
