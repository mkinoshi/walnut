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

const UserSchema = new mongoose.Schema({
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
  },
  quotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quotes'
  }
});

const QuoteSchema = new mongoose.Schema({
  content: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const PostSchema = new mongoose.Schema({
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
});

const CommentSchema = new mongoose.Schema({
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
});

const TagSchema = new mongoose.Schema({
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts'
    }
  ]
});

const Token = mongoose.model('Token', TokenSchema);
const User = mongoose.model('User', UserSchema);
const Quotes = mongoose.model('Quote', QuoteSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Tag = mongoose.model('Tag', TagSchema);

module.exports = {
  Token: Token,
  User: User,
  Quotes: Quotes,
  Post: Post,
  Comment: Comment,
  Tag: Tag
};
