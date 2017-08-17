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
    default:
      return state;
  }
};

export default postReducer;
