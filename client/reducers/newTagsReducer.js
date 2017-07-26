/**
 * Created by ebadgio on 7/25/17.
 */
const newTagsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_TAG':
      const newState = state.slice();
      newState.push(action.tag);
      return newState;
    case 'NEW_TAG_ERROR':
      return state;
    default:
      return state;
  }
};

export default newTagsReducer;
