import express from 'express';
const router = express.Router();
import {Tag, Post} from '../models/models';
// you have to import models like so:
// import TodoItem from '../models/TodoItem.js'
router.get('/getDiscoverInfo', function(req, res) {
  let filters = [];
  let posts = [];
  Tag.find()
  .then((tags) => {
    filters = tags.map((tagObj) => {
      // ['general', 'technology'] for testing
      if (req.user.preferences.includes(tagObj.name)) {
        return {name: tagObj.name, checked: true};
      }
      return {name: tagObj.name, checked: false};
    });
    Post.find()
    .populate('comments')
    .populate('comments.createdBy')
    .populate('createdBy')
    .then((postArr) => {
      posts = postArr.map((postObj) => {
        return {
          postId: postObj._id,
          username: postObj.createdBy.username,
          pictureURL: postObj.createdBy.pictureURL,
          content: postObj.content,
          createdAt: postObj.createdAt,
          tags: postObj.tags,
          likes: postObj.likes.length,
          commentNumber: postObj.commentNumber,
          comments: postObj.comments.map((commentObj) => {
            return {
              username: commentObj.createdBy.username,
              pictureURL: commentObj.createdBy.pictureURL,
              content: commentObj.content,
              createdAt: commentObj.createdAt,
              likes: commentObj.likes.length
            };
          })
        };
      });
      console.log({filters: filters, posts: posts});
      return {filters: filters, posts: posts};
    });
  });
});

router.post('/newPost', function(req, res) {
  console.log('it is hitting here');
  const newPost = new Post({
    content: req.body.postBody,
    createdAt: new Date(),
    createdBy: req.user._id,
    likes: [],
    tags: req.body.postTags,
    comments: [],
    commentNumber: 0,
  });
  console.log(newPost);
  newPost.save()
  .then(() => {
    console.log('success!');
    res.send({success: true});
  })
  .catch((e) => {
    console.log(e);
    res.send({success: false});
  });
});

module.exports = router;
