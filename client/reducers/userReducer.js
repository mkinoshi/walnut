const userObj = {
  communities: [],
  currentCommunity: {},
  username: '',
  fullName: '',
  facebookId: '',
  email: '',
  password: '',
  pictureURL: '',
  preferences: [],
  location: {
    college: [],
    homeTown: [],
    occupation: [],
    live: []
  },
  placesLived: {
    from: '',
    current: '',
    other: []
  },
  contact: {
    phones: [
    ],
    email: []
  },
  work: [
  ],
  education: {
    colleges: [
    ],
    schools: [
    ]
  },
  links: [],
  interests: [],
  projects: [],
  portfolio: [
    {name: 'media', data: []},
    {name: 'documents', data: []},
    {name: 'code', data: []},
    {name: 'design', data: []}
  ],
  tags: [],
  hasProfile: false
};



const userReducer = (state = userObj, action) => {
  switch(action.type) {
    case 'GET_USER_DATA_DONE':
      return action.data;
    case 'GET_FILTERS_UPDATE_FRONT':
      return {
        ...state,
        preferences: action.data.preferences
      };
    case 'GET_USER_DATA_ERROR':
      return state;
    case 'UPDATE_LOCATION_DONE':
      return {
        ...state,
        location: {
          ...state.location,
          live: action.location
        }
      };
    case 'UPDATE_LOCATION_DONE_ERR':
      return state;
    case 'ADD_TAB': {
      const newState = JSON.parse(JSON.stringify(state));
      const obj = {
        name: action.data,
        data: []
      };
      newState.portfolio.push(obj);
      return newState;
    }
    case 'UPDATE_TAB': {
      const newState = JSON.parse(JSON.stringify(state));
      newState.portfolio[action.index].name = action.name;
      return newState;
    }
    case 'REMOVE_TAB': {
      const newPortfolio = [...state.portfolio];
      newPortfolio.splice(action.index, 1);
      return Object.assign({}, state, { portfolio: newPortfolio });
    }
    case 'REMOVE_FILE':
      const newState3 = JSON.parse(JSON.stringify(state));
      let index = - 1;
      for(let i = 0; i < newState3.portfolio.length; i += 1) {
        if(newState3.portfolio[i].name === action.tab) {
          index = i;
        }
      }
      if(index > - 1) {
        newState3.portfolio[index].data.splice(action.index, 1);
        console.log('sdffsddsfsfdffs', newState3);
        return newState3;
      }
      return newState3;
    default:
      return state;
  }
};

export default userReducer;
