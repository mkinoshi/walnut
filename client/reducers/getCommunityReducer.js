const getCommunityReducer = (state = {
  communities: [],
  isFetching: false
}, action) => {
  switch (action.type) {
    case 'COMMUNITIES_IS_FETCHING':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_ALL_COMMUNITIES_DONE':
      return {
        ...state,
        communities: action.communities,
        isFetching: false
      };
    case 'GET_ALL_COMMUNITIES_ERROR':
      return state;
    default:
      return state;
  }
};


export default getCommunityReducer;
