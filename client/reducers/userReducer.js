const userObj = {
  communities: [],
  currentCommunity: '',
  username: '',
  fullName: '',
  facebookId: '',
  email: '',
  password: '',
  pictureURL: '',
  preferences: [],
  from: '',
  location: {
    college: [],
    homeTown: [],
    occupation: [],
    live: []
  },
  phone: '',
  currentOccupation: '',
  currentOccupationCity: '',
  pastOccupations: [],
  links: [],
  interests: [],
  projects: [],
  portfolio: {
    media: [],
    documents: [],
    code: [],
    design: []
  },
  education: {
    college: '',
    majors: [],
    classYear: '',
  },
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
    default:
      return state;
  }
};

export default userReducer;
