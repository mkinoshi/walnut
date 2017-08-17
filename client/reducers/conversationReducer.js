/**
 * Created by ebadgio on 8/16/17.
 */
const conversationReducer = (state = { current: '', convos: [], iDs: []}, action) => {
  switch(action.type) {
    case 'GET_MY_CONVOS_DONE':
      return {
        ...state,
        convos: action.posts
      };
    case 'SWITCH_COM':
      return {
        convos: [],
        iDs: [],
        current: action.communityId
      };
    case 'ADD_IDS':
      return {
        ...state,
        iDs: action.iDs
      };
    default:
      return state;
  }
};
export default conversationReducer;
