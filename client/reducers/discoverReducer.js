
const discoverReducer = (state = {
  defaultFilters: [],
  otherFilters: [],
  filters: [],
  posts: [],
  hasMore: true,
  isFetching: true,
  isReady: true,
  holdDiscover: false,
  lastRefresh: '',
  useFilters: [],
  modalIsOpen: false
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
        isFetching: false,
        lastRefresh: action.lastRefresh
      };
    case 'GET_DISCOVER_DATA_REFRESH':
      return {
        ...state,
        posts: action.posts.concat(state.posts).slice(0, 10),
        lastRefresh: action.lastRefresh
      };
    case 'GET_DISCOVER_DATA_ERROR':
      return state;
    case 'GET_DISCOVER_POSTS_DONE':
      return {
        ...state,
        posts: action.posts,
        lastRefresh: action.lastRefresh
      };
    case 'GET_NEXT_TEN_DONE':
      return {
        ...state,
        posts: action.posts.length > 0 && state.posts[state.posts.length - 1].postId !== action.posts[action.posts.length - 1].postId ?
        state.posts.concat(action.posts) : state.posts,
        hasMore: action.posts.length > 0
      };
    case 'GET_NEXT_TEN_ERROR':
      return state;
    case 'TOGGLE_FILTER_FRONT':
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
    case 'HAS_MORE':
      return {
        ...state,
        hasMore: true
      };
    case 'NO_MORE':
      return {
        ...state,
        hasMore: false
      };
    case 'ADD_FILTERS':
      return {
        ...state,
        useFilters: state.useFilters.concat(action.tags)
      };
    case 'REMOVE_FILTER':
      return {
        ...state,
        useFilters: action.tags
      };
    case 'NEW_TAG':
      return {
        ...state,
        otherFilters: state.otherFilters.concat(action.tag)
      };
    case 'MODAL_TOGGLE':
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen
      };
    default:
      return state;
  }
};



export default discoverReducer;
