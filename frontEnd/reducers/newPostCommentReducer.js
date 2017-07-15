
const newPostCommentReducer = (state = {
  comment: '',
  post: ''
}, action) => {
  const data = Object.assign({}, state);
  switch (action.type) {
    case 'ONCHANGE_POST':
      data.post = action.post;
      return data;
    case 'ONCHANGE_COMMENT':
      data.comment = action.comment;
      return data;
    // case 'NEW_COMMENT':
    // TODO passes action.commentBody and action.postId to /db/newComment
    // case 'NEW_POST':
    // TODO passes action.postBody and action.tags to /db/newPost
    case 'TOGGLE_FILTER_CHECKED':
      // TODO needs to be done on the backend
      data.filters[action.index].checked = !data.filters[action.index].checked;
      return data;
    default:
      return data;
  }
};


export default newPostCommentReducer;
