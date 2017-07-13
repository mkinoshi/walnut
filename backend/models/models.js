
"use strict";
//Maybe we have to use schema
var mongoose = require('mongoose');

//Not sure how to use Token
var Token = mongoose.model('Token', {
  userId: {
    type: String
  },
  token: {
    type: String
  },
  createdAt: {
    type: Date
  }
})

var User = mongoose.model('User', {
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  Project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  preferences: {
    type: Array // array of string, and it has to be match with tag
  }
  quotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quotes'
  }
})

var Quotes = mongoose.model('Quotes', {
  content: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Post = mongoose.model('Post', {
  content: {
    type: String
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }
  ],
  createdAt: {
    type: Date
  },
  tags: {
    type: String // array of string, and it has to be match with tag
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Comments = mongoose.model('Comments', {
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
})

var Tag = mongoose.model('Tag', {
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts'
    }
  ]
})

module.exports = {
  Token: Token,
  User: User,
  Quotes: Quotes,
  Post: Post,
  Comments: Comments,
  Tag: Tag
}
