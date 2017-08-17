const postReducer = (state = {
  postTags: []
}, action) => {
  switch(action.type) {
    case 'NEW_TAG':
      return {
        ...state,
        postTags: state.postTags.concat(action.tag)
      };
    case 'ADD_TAG':
      return {
        ...state,
        postTags: state.postTags.concat(action.tag)
      };
    case 'DELETE_TAG':
      return {
        ...state,
        postTags: state.postTags.filter((tag) => tag._id !== action.tag._id)
      };
    case 'CLEAR_POST_TAG':
      return {
        ...state,
        postTags: []
      };
    default:
      return state;
  }
};

export default postReducer;
