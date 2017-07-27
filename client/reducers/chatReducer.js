
const chatReducer = (state = {
  users: [],
  isModalShow: false,
  isChatEmpty: true,
  chatTitle: ''
}, action) => {
  switch(action.type) {
    case 'GET_USER_DONE':
      return {
        ...state,
        users: action.users
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalShow: !state.isModalShow
      };
    case 'UNEMPTY_CHAT':
      return {
        ...state,
        isChatEmpty: false
      };
    case 'NEW_TITLE':
      return {
        ...state,
        chatTitle: action.title
      };
    default:
      return state;
  }
};
export default chatReducer;
