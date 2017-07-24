
// our states will be center and zoom

const mapReducer = (state = {
  selected: 'live',
  center: [-103.59179687498357, 40.66995747013945],
  zoom: [3],
  usersData: [],
  clicked: -1
}, action) => {
  switch (action.type) {
    case 'NEW_CENTER':
      return {
        ...state,
        center: action.center
      };
    case 'UPDATE_ZOOM':
      return {
        ...state,
        zoom: [10]
      };
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        selected: action.selected
      };
    case 'UPDATE_CLICKED':
      return {
        ...state,
        clicked: action.clicked
      };
    case 'GET_USERS_DATA_MAP':
      // get user data with axios request
      // convert the data to objects that can be used in the Map components
      return {
        ...state,
        // adds the userData to the store
      };
    default:
      return state;
  }
};

export default mapReducer;
