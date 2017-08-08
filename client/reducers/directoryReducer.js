
// our states will be center and zoom

const directoryReducer = (state = {
  users: []
}, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS_DIRECTORY_DONE':
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};

export default directoryReducer;
