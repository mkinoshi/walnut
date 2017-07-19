
const discoverReducer = (state = {
  filters: [],
  posts: []
}, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'GET_DISCOVER_DATA_DONE':
      return action.data;
    case 'GET_DISCOVER_DATA_ERROR':
      return state;
    case 'TOGGLE_FILTER_FRONT':
      newState.filters[action.index].checked = !newState.filters[action.index].checked;
      return newState;
    default:
      return state;
  }
};



export default discoverReducer;
