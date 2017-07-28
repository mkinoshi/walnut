const getCommunityReducer = (state = { communities: [], currentCommunity: {}}, action) => {
  switch (action.type) {
    case 'GET_ALL_COMMUNITIES_DONE':
      console.log('action communities', state, action.communities.data);
      const newState1 = Object.assign({}, state);
      newState1.communities = action.communities.data;
      return newState1;

    case 'GET_ALL_COMMUNITIES_ERROR':
      return state;

    case 'GET_COMMUNITY_DONE':
      console.log('action community', state, action.community);
      return Object.assign({}, state, { currentCommunity: action.community });
    case 'GET_COMMUNITY_ERROR':
      return state;

    default:
      return state;
  }
};


export default getCommunityReducer;
