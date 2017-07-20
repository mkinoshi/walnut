const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_USER_DATA_DONE':
      return {
        ...state,
        username: action.data.username,
        pictureURL: action.data.pictureURL
      };
    case 'GET_USER_DATA_ERROR':
      return state;
    default:
      return state;
  }
};

export default userReducer;
