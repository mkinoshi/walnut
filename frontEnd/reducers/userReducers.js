const userReducer = (state = {username: '', profileURL: ''}, action) => {
  switch(action.type) {
    case 'GET_USER_DATA_DONE':
      return {
        ...state,
        username: action.data.username,
        pictureURL: action.data.pictureURL
      };
    default:
      return state;
  }
};

export default userReducer;
