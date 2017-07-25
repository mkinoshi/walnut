
const discoverReducer = (state = {
  filters: [],
  posts: [],
  hasMore: true
}, action) => {
  switch (action.type) {
    case 'GET_DISCOVER_DATA_DONE':
      console.log('discover action', action);
      // const newState1 = Object.assign({}, state);
      // newState1.posts = newState1.posts.concat(action.posts);
      // newState1.filters = newState1.filters.concat(action.filters);
      const newState1 = {
        filters: action.filters,
        posts: action.posts
      };
      return newState1;
    case 'GET_DISCOVER_DATA_ERROR':
      return state;
    case 'GET_NEXT_TEN_DONE':
      // const newState2 = Object.assign({}, state);
      // newState2.posts = newState2.posts.concat(action.posts);
      // return newState2;
      return {
        ...state,
        posts: state.posts[state.posts.length - 1].postId !== action.posts[action.posts.length - 1].postId ?
        state.posts.concat(action.posts) : state.posts,
        hasMore: action.posts.length > 0 ? true : false
      };
    case 'GET_NEXT_TEN_ERROR':
      return state;
    case 'TOGGLE_FILTER_FRONT':
      const newState = JSON.parse(JSON.stringify(state));
      newState.filters[action.index].checked = !newState.filters[action.index].checked;
      // return {
      //   ...state,
      //   filters: {

      //   }
      // }
      return newState;
    default:
      return state;
  }
};



export default discoverReducer;
