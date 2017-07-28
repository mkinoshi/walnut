
const discoverReducer = (state = {
  defaultFilters: [],
  otherFilters: [],
  posts: [],
  hasMore: true
}, action) => {
  switch (action.type) {
    case 'GET_DISCOVER_DATA_DONE': {
      console.log('discover action', action);
      const newState = {
        defaultFilters: action.defaultFilters,
        otherFilters: action.otherFilters,
        posts: action.posts,
        hasMore: true
      };
      return newState;
    }
    case 'GET_DISCOVER_DATA_ERROR':
      return state;
    case 'GET_NEXT_TEN_DONE':
      // const newState2 = Object.assign({}, state);
      // newState2.posts = newState2.posts.concat(action.posts);
      // return newState2;
      return {
        ...state,
        posts: action.posts.length > 0 && state.posts[state.posts.length - 1].postId !== action.posts[action.posts.length - 1].postId ?
        state.posts.concat(action.posts) : state.posts,
        hasMore: action.posts.length > 0
      };
    case 'GET_NEXT_TEN_ERROR':
      return state;
    case 'TOGGLE_FILTER_FRONT': {
      const newState = JSON.parse(JSON.stringify(state));
      newState.filters[action.index].checked = !newState.filters[action.index].checked;
      // return {
      //   ...state,
      //   filters: {

      //   }
      // }
      return newState;
    }
    default:
      return state;
  }
};



export default discoverReducer;
