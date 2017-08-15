
// our states will be center and zoom

const directoryReducer = (state = {
  users: [],
  lastRefresh: ''
}, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS_DIRECTORY_DONE':
      return {
        ...state,
        users: action.users,
        lastRefresh: action.lastRefresh
      };
    default:
      return state;
  }
};

export default directoryReducer;
