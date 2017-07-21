

const appReducer = (state = {
  isLoaded: false
}, action) => {
  switch (action.type) {
    case 'STATE_FILLED':
      return action.isLoaded;
    case 'STATE_FILLED_ERROR':
      console.log('error in data retrieval on load');
      return state;
    default:
      return state;
  }
};



export default appReducer;
