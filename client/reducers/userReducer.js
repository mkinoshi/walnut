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
    college: '',
    homeTown: '',
    occupation: ''
  },
  phone: '',
  currentOccupation: '',
  currentOccupationCity: '',
  pastOccupations: [],
  links: [],
  interests: [],
  projects: [],
  portfolio: [],
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
    default:
      return state;
  }
};

export default userReducer;
