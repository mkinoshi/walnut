'use strict';
// Maybe we have to use schema
import mongoose from 'mongoose';

// Not sure how to use Token
const TokenSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  token: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

const CommunitySchema = new mongoose.Schema({
  title: {
    type: String
  },
  users: {
    type: Array
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  facebookId: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  pictureURL: {
    type: String
  },
  Project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  preferences: [
    {
      type: String
    }
  ]
});

const UserIdentitySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  isCreated: {
    type: Boolean
  },
  tags: {
    type: Array
  },
  blurb: {
    type: Array
  },
  fullNames: {
    type: Array
  },
  email: {
    type: Array
  },
  address: {
    type: []
  },
  location: {
    college: [Number],
    homeTown: [Number],
    occupation: [Number]
  },
  phone: {
    type: Array
  },
  currentOccupation: {
    type: String,
    default: ''
  },
  currentOccupationCity: {
    type: String,
    default: null
  },
  pastOccupations: {
    type: Array
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
  profileURL: {
    type: Array,
  },
  usernames: {
    type: Array
  },
  education: {
    type: Array
  },
  majors: {
    type: Array
  },
  story: {
    type: Array
  }
});


const ProfileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isCreated: {
    type: Boolean
  },
  tags: {
    type: Array
  },
  blurb: {
    type: String,
    default: ''
  },
  fullName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  location: {
    college: [Number],
    homeTown: [Number],
    occupation: [Number]
  },
  phone: {
    type: String,
    default: ''
  },
  currentOccupation: {
    type: String,
    default: ''
  },
  currentOccupationCity: {
    type: String,
    default: null
  },
  pastOccupations: {
    type: Array
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
  profileURL: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  majors: {
    type: Array
  },
  story: {
    type: Array
  }
});

const QuoteSchema = new mongoose.Schema({
  content: {
    type: String
  },
  createdBy: {
    type: String
  }
});

const PostSchema = new mongoose.Schema({
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
      type: String,
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
  }
});


const TagSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts'
    }
  ]
});

const Token = mongoose.model('Token', TokenSchema);
const User = mongoose.model('User', UserSchema);
const Quote = mongoose.model('Quote', QuoteSchema);
const Post = mongoose.model('Post', PostSchema);
const Tag = mongoose.model('Tag', TagSchema);
const Profile = mongoose.model('Profile', ProfileSchema);
const UserIdentity = mongoose.model('Identity', UserIdentitySchema);
const Community = mongoose.model('Community', CommunitySchema);


module.exports = {
  Token: Token,
  User: User,
  Quote: Quote,
  Post: Post,
  Tag: Tag,
  Profile: Profile,
  UserIdentity: UserIdentity,
  Community: Community
};
