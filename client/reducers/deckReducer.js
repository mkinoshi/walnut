const dummyData = {
  profiles: [
    {
      _id: '1234',
      head: {
        fullName: 'Eli Badgio',
        tags: ['alumni', '2017S'],
        blurb: 'this is a blurb',
        profileURL: ['http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg'],
      },
      info: {
        about: {
          education: 'rice',
          majors: ['cs'],
          currentOccupation: 'joker',
          pastOccupations: [],
        },
        contact: {
          email: 'ebadgio@gmail.com',
          from: 'PA',
          phone: '4324546',
        },
        // TODO : ELI INTERESTS ALSO TO DO THE ON CLICK FILTER
        interests: ['react', 'marketing'],
        Projects: [
          // {
          //   picture: 'https://s-media-cache-ak0.pinimg.com/originals/fb/76/5b/fb765b8752d50de50cfa15203f9a7acd.png',
          //   name: 'Project1'
          // },
          // {
          //   picture: 'https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png',
          //   name: 'Project2'
          // }
        ],
        links: ['https://www.facebook.com/aglk1'],
      },
      main: {
        portfolio: {
        },
        story: {
        }
      }
    },
    {
      _id: '1235',
      head: {
        fullName: 'Makoto Kinoshita',
        tags: ['alumni', '2017S'],
        blurb: 'this is maks blurb',
        profileURL: ['http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg'],
      },
      info: {
        about: {
          education: 'colby college',
          majors: ['cs', 'backend'],
          currentOccupation: 'professional pole vaulter',
          pastOccupations: [],
        },
        contact: {
          email: 'mkinoshi@gmail.com',
          from: 'osaka',
          phone: '2345894595',
        },
        interests: ['react'],
        Projects: [
          // {
          //   picture: 'https://s-media-cache-ak0.pinimg.com/originals/fb/76/5b/fb765b8752d50de50cfa15203f9a7acd.png',
          //   name: 'Project1'
          // },
          // {
          //   picture: 'https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png',
          //   name: 'Project2'
          // }
        ],
        links: ['https://www.google.com'],
      },
      main: {
        portfolio: {
        },
        story: {
        }
      }
    },
    {
      _id: '14567',
      head: {
        fullName: 'Omid Rooholfada',
        tags: ['ta', '2017S'],
        blurb: 'this is omids blurb',
        profileURL: ['http://cdnak1.psbin.com/img/mw=160/mh=210/cr=n/d=q864a/dpe4wfzcew4tph99.jpg'],
      },
      info: {
        about: {
          education: 'yale',
          majors: ['cs', 'econ'],
          currentOccupation: 'bandit',
          pastOccupations: [],
        },
        contact: {
          email: 'omid@gmail.com',
          location: 'cali',
          phone: '3489457846',
        },
        interests: ['react', 'tech'],
        Projects: [
          // {
          //   picture: 'https://s-media-cache-ak0.pinimg.com/originals/fb/76/5b/fb765b8752d50de50cfa15203f9a7acd.png',
          //   name: 'Project1'
          // },
          // {
          //   picture: 'https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png',
          //   name: 'Project2'
          // }
        ],
        links: ['https://www.facebook.com/aglk1'],
      },
      main: {
        portfolio: {
        },
        story: {
        }
      }
    },
  ]
};

const deckReducer = (state = dummyData, action) => {
  switch(action.type) {
    case 'GET_ALL_PROFILES_DONE':
      console.log('in deckReducer', action.data);
      return action.data;
    case 'GET_ALL_PROFILES_ERROR':
      return state;
    default:
      return state;
  }
};

export default deckReducer;


