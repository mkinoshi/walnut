'use strict';
// Maybe we have to use schema
import mongoose from 'mongoose';
const CommunitySchema = new mongoose.Schema({
  title: {
    type: String
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  icon: {
    type: String,
  },
  defaultTags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  otherTags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
});

const UserSchema = new mongoose.Schema({
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community'
    }
  ],
  currentCommunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
  },
  fullName: {
    type: String
  },
  firebaseId: {
    type: String
  },
  facebookId: {
    type: String
  },
  password: {
    type: String
  },
  pictureURL: {
    type: String,
    default: ''
  },
  preferences: {
    type: Array
  },
  conversations: {
    type: Array
  },
  communityPreference: {
    type: Array
  },
  placesLived: {
    from: {
      type: String
    },
    current: {
      type: String
    },
    other: [
      {
        type: String
      }
    ]
  },
  location: {
    college: [Number],
    homeTown: [Number],
    occupation: [Number],
    live: [Number]
  },
  links: {
    type: Array
  },
  interests: {
    type: Array
  },
  projects: {
    type: Array
  },
  portfolio: {
    type: Array
  },
  contact: {
    phones: [
      {
        use: {
          type: String
        },
        number: {
          type: String
        }
      }
    ],
    email: [{
      type: String
    }]
  },
  work: [
    {
      company: {
        type: String,
      },
      position: {
        type: String,
      },
      location: {
        type: String,
      },
      isCurrent: {
        type: Boolean
      }
    }
  ],
  education: {
    colleges: [
      {
        name: {
          type: String,
        },
        attendedFor: {
          type: String,
        },
        concentrations: {
          type: Array,
        },
        startedAt: {
          type: String,
        },
        endedAt: {
          type: String,
        },
        isGraduated: {
          type: Boolean,
        },
        degreeType: {
          type: String
        }
      },
    ],
    schools: [
      {
        name: {
          type: String,
        },
        startedAt: {
          type: String,
        },
        endedAt: {
          type: String,
        },
        isGraduated: {
          type: Boolean,
        }
      }
    ]
  },
  tags: {
    type: Array
  },
  hasProfile: {
    type: Boolean
  },
  blurb: {
    type: String,
    default: ''
  },
  isEdited: {
    type: Boolean
  }
});

const QuoteSchema = new mongoose.Schema({
  content: {
    type: String
  },
  createdBy: {
    type: String
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  }
});

const PostSchema = new mongoose.Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  comments: [
    {
      content: {
        type: String
      },
      createdAt: {
        type: Date
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    }
  ],
  commentNumber: {
    type: Number
  },
  link: {
    type: String,
    default: ''
  },
  attachment: {
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
});


const TagSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  name: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);
const Quote = mongoose.model('Quote', QuoteSchema);
const Post = mongoose.model('Post', PostSchema);
const Tag = mongoose.model('Tag', TagSchema);
const Community = mongoose.model('Community', CommunitySchema);


module.exports = {
  User: User,
  Quote: Quote,
  Post: Post,
  Tag: Tag,
  Community: Community
};
