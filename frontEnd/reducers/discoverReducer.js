
// TODO check toggle state return new post props down to feed

const dummyState = {
  filters: [
    {name: 'general',
    checked: false},
    {name: 'technology', checked: false},
    {name: 'jobs', checked: false},
    {name: 'marketing', checked: false},
    {name: 'meetUps', checked: false},
    {name: 'futureTechnologies', checked: false},
    {name: 'designPrinciples', checked: false}
  ],
  posts: [
    {username: 'alexlatif',
    pictureURL: 'url',
    content: 'this is post',
    createdAt: 'Monday at 10:30',
    tags: ['general', 'marketing'], likes: 4,
    commentNumber: 5,
    comments: [
      {username: 'omidrooo', pictureURL: 'url', content: 'this is comment',
      createdAt: 'Monday at 10:35', likes: 5
      }]
    },

    {username: 'otto', pictureURL: 'url', content: 'this is tech only post',
    createdAt: 'Monday at 10:30', tags: ['technology'], likes: 4, commentNumber: 5,
    comments: [
      {username: 'omidrooo', pictureURL: 'url', content: 'this is comment',
      createdAt: 'Monday at 10:35', likes: 4
      },
      {username: 'otto', pictureURL: 'url', content: 'this is comment',
      createdAt: 'Monday at 10:35', likes: 4
      },
      {username: 'otto', pictureURL: 'url', content: 'this is comment',
      createdAt: 'Monday at 10:35', likes: 4
      }]
    },

    {username: 'mak', pictureURL: 'url', content: 'this is tech and general post',
    createdAt: 'Monday at 10:30', tags: ['general', 'technology'], likes: 4,
    commentNumber: 5,
    comments: [
      {username: 'omidrooo', pictureURL: 'url', content: 'this is comment',
      createdAt: 'Monday at 10:35', likes: 4
      }]
    }
  ]
};

const discoverReducer = (state = dummyState, action) => {
  const data = Object.assign({}, state);
  switch (action.type) {
    // case 'UPDATE_POST' {
    //   posts: state.posts.map((post) => postReducer(post, action))
    // }
    case 'TOGGLE_FILTER_CHECKED':
      data.filters[action.index].checked = !data.filters[action.index].checked;
      return data;
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
