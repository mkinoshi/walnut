const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_USER_DATA_DONE':
      return action.data;
    case 'GET_USER_DATA_ERROR':
      return state;
    default:
      return state;
  }
};

export default userReducer;
