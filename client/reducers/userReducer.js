const userObj = {
  communities: [],
  currentCommunity: {},
  username: '',
  fullName: '',
  facebookId: '',
  password: '',
  pictureURL: '',
  preferences: [],
  communityPreference: [],
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
  hasProfile: false,
  isFetching: false,
  blurb: '',
  isCreated: true,
  isEdited: true,
  currentConversations: []
};

const userReducer = (state = userObj, action) => {
  switch(action.type) {
    case 'USER_IS_FETCHING':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_USER_DATA_DONE':
      return {
        ...action.user,
        isFetching: false,
        isCreated: true
      };
    case 'ADD_TEMP_FILTER':
      return {
        ...state,
        communityPreference: [...state.communityPreference].concat(action.useFilters)
      };
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
        return newState3;
      }
      return newState3;
    case 'USER_IS_NOT_CREATED':
      return {
        ...state,
        isCreated: false
      };
    case 'USER_IS_CREATED':
      return {
        ...state,
        isCreated: true
      };
    case 'LOGOUT_DONE':
      return userObj;
    case 'LOGOUT_ERROR':
      return state;
    default:
      return state;
  }
};

export default userReducer;
