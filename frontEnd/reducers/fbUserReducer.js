const fbUserReducer = (state = {username: '', profileURL: ''}, action) => {
  switch(action.type) {
    case 'GET_FB_DATA_DONE':
      return {
        ...state,
        username: action.data.username,
        pictureURL: action.data.pictureURL
      };
    case 'GET_FB_DATA_ERROR':
      return state;
    default:
      return state;
  }
};

export default fbUserReducer;
