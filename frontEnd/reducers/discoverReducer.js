
const discoverReducer = (state = {
  filters: [],
  posts: []
}, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'GET_DISCOVER_DATA_DONE':
      newState.filters = action.data.filters;
      newState.posts = action.data.posts;
      return newState;
    case 'GET_DISCOVER_DATA_ERROR':
      return newState;
    case 'TOGGLE_FILTER_FRONT':
      newState.filters[action.index].checked = !newState.filters[action.index].checked;
      return newState;
    default:
      return newState;
  }
};



export default discoverReducer;
