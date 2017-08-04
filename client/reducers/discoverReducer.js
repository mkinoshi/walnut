
const discoverReducer = (state = {
  defaultFilters: [],
  otherFilters: [],
  filters: [],
  posts: [],
  hasMore: true,
  isFetching: false,
  isReady: true
}, action) => {
  switch (action.type) {
    case 'DISCOVER_IS_LOADING':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_DISCOVER_DATA_DONE':
      return  {
        ...state,
        defaultFilters: action.defaultFilters,
        otherFilters: action.otherFilters,
        posts: action.posts,
        hasMore: true,
        isFetching: false
      };
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
    case 'HOLD_DISCOVER':
      return {
        ...state,
        isReady: false
      };
    case 'DISCOVER_READY':
      return {
        ...state,
        isReady: true
      };
    case 'CHANGE_FILTERS':
      return {
        ...state,
        filters: action.filters
      };
    default:
      return state;
  }
};



export default discoverReducer;
