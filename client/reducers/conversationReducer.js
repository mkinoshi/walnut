/**
 * Created by ebadgio on 8/16/17.
 */
const conversationReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_MY_CONVOS_DONE':
      return {
        ...state,
        convos: action.posts
      };
    case 'SWITCH_COM':
      return {
        convos: [],
        current: action.communityId
      };
    default:
      return state;
  }
};
export default conversationReducer;
