
const discoverReducer = (state = {
  filters: [],
  posts: []
}, action) => {
  const data = Object.assign({}, state);
  switch (action.type) {

    case 'GET_DATA':
      data.filters = action.data.filters;
      data.posts = action.data.posts;
      return data;
    case 'GET_DATA_ERROR':
      return data;
    default:
      return data;
  }
};



export default discoverReducer;
