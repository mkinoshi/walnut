import express from 'express';
const router = express.Router();
import Tag from '../models/models';
import Post from '../models/models';
// you have to import models like so:
// import TodoItem from '../models/TodoItem.js'
router.get('/getDiscoverInfo', function(req, res) {
  console.log(req.user);
  let filters = [];
  let posts = [];
  Tag.find()
  .then((tags) => {
    filters = tags.map((tagObj) => {
      if (req.user.preferences.includes(tagObj.name)) {
        return {name: tagObj.name, checked: true};
      }
      return {name: tagObj.name, checked: false};
    });
  });
  Post.find()
  .populate('comments')
  .populate('comments.createdBy')
  .populate('createdBy')
  .then((postArr) => {
    posts = postArr.map((postObj) => {
      return {
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
  });
  return {filters: filters, posts: posts};
});

module.exports = router;
