
// TODO check toggle state return new post props down to feed
import axios from 'axios'

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

    case 'GET_DATA':
      data = action.response;
      return data;
    default:
      return data;
  }
};



export default discoverReducer;
