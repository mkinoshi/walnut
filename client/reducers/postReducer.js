const postReducer = (state = {
  postTags: [],
  newPostTags: [],
}, action) => {
  switch(action.type) {
    case 'ADD_NEW_TAG':
      return {
        ...state,
        newPostTags: state.newPostTags.concat(action.tag)
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
    case 'DELETE_NEW_TAG':
      return {
        ...state,
        newPostTags: state.newPostTags.filter((tag) => tag !== action.tag)
      };
    case 'CLEAR_POST_TAG':
      return {
        ...state,
        postTags: [],
        newPostTags: []
      };
    default:
      return state;
  }
};

export default postReducer;
