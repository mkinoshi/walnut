

const dummyData = {
  fname: 'Eli',
  lname: 'Badgio',
  email: 'ebadgio@gmail.com',
  profileURL: 'http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg',
  Project: [
    // {
    //   picture: 'https://s-media-cache-ak0.pinimg.com/originals/fb/76/5b/fb765b8752d50de50cfa15203f9a7acd.png',
    //   name: 'Project1'
    // },
    // {
    //   picture: 'https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png',
    //   name: 'Project2'
    // }
  ],
  isCreated: false,
  tags: [],
  blurb: '',
  location: '',
  phone: '',
  currentOccupation: '',
  pastOccupations: [],
  links: {
    fb: {name: 'fb', url: 'https://www.facebook.com/aglk1'}
  },
  interests: {
    // programming: ['react', 'redux']
  },
  portfolio: {
  }
};

const createProfileReducer = (state = dummyData, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'GET_DATA':
    case 'GET_DATA_ERROR':
    default:
      return newState;
  }
};



export default createProfileReducer;
