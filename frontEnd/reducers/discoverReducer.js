// STATE or dummy STATE
// TODO  posts array
// TODO preferences on hashtags in array


const discoverReducer = (state = {}, action) => {
  const data = Object.assign({}, state);
  switch (action.type) {
    // case 'UPDATE_POST' {
    //   posts: state.posts.map((post) => postReducer(post, action))
    // }
    default:
      return data;
  }
};


// function postReducer(post = {}, action) {
//   switch (action.type) {
//     case 'update':
//     if (action.id === post.id) {
//       // update and return
//     } else {
//       return state;
//     }
//   }
// }


export default discoverReducer;
