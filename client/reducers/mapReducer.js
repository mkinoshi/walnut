
// our states will be center and zoom

const mapReducer = (state = {
  center: [-103.59179687498357, 40.66995747013945],
  zoom: [3]
}, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'NEW_CENTER':
      newState.center = action.center;
      return newState;
    case 'UPDATE_ZOOM':
      newState.zoom = [10];
      return newState;
    default:
      return newState;
  }
};

export default mapReducer;
