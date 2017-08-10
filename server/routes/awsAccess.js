import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
// TODO user models with new db layout
import {User, Post} from '../models/models';

AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

const router = express.Router();
// Amazon s3 config
const s3 = new AWS.S3();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 },
});

router.post('/upload/portfolio', upload.single('portfolio'), (req, res) => {
  const toSave = req.user._id + (req.query.name || req.file.originalname) + Date.now();
  s3.putObject({
    Bucket: 'walnut-test',
    Key: toSave,
    Body: req.file.buffer,
    ACL: 'public-read',
  }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      return;
    }
    User.findById(req.user._id)
    .then((user) => {
      const newFile = {
        fileName: req.query.name,
        fileType: req.file.mimetype,
        fileUrl: process.env.AWS_BUCKET_URL + toSave
      };
      user.portfolio.filter((i) => (i.name === req.query.port))[0].data.push(newFile);
      user.markModified('portfolio');
      return user.save();
    })
    .then(user => {
      res.json({portfolio: user.portfolio});
    })
    .catch((error) => console.log('error in aws db save', error));
  });
  console.log('query....', req.query);
});

router.post('/upload/profile', upload.single('profile'), (req, res) => {
  console.log('inside aws', req.user, req.file);
  const toSave = req.user._id + req.file.originalname + Date.now();
  s3.putObject({
    Bucket: 'walnut-test',
    Key: toSave,
    Body: req.file.buffer,
    ACL: 'public-read',
  }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      return;
    }
    User.findById(req.user._id)
    .then((user) => {
      const url = process.env.AWS_BUCKET_URL + toSave;
      user.pictureURL = url;
      return user.save();
    })
    .then((user) => {
      console.log('end of upload', user);
      res.json({pictureURL: user.pictureURL});
    })
    .catch((error) => console.log('error in aws db save', error));
  });
});

router.post('/upload/post', upload.single('attach'), (req, res) => {
  console.log(req.file);
  const toSave = req.user._id + req.file.originalname + Date.now();
  s3.putObject({
    Bucket: 'walnut-test',
    Key: toSave,
    Body: req.file.buffer,
    ACL: 'public-read',
  }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      return;
    }
    const newPost = new Post({
      content: req.body.body,
      createdAt: new Date(),
      createdBy: req.user._id,
      likes: [],
      tags: req.body.tags,
      comments: [],
      commentNumber: 0,
      community: req.user.currentCommunity,
      link: '',
      attachment: {
        name: req.body.name ? req.body.name : req.file.originalname,
        url: process.env.AWS_BUCKET_URL + toSave,
        type: req.file.mimetype,
      }
    });
    newPost.save()
    .then((post) => {
      let posts = [];
      const filter = req.user.communityPreference.length > 0 ? { tags: { $in: req.user.communityPreference }, community: req.user.currentCommunity, createdAt: { $gte: new Date(req.query.lastRefresh) } }
        : { community: req.user.currentCommunity, createdAt: { $gte: new Date(req.query.lastRefresh) } };
      Post.find(filter)
        .sort({ createdAt: -1 })
        .populate('tags')
        .populate('comments')
        .populate('comments.createdBy')
        .populate('createdBy')
        .then((postArr) => {
          posts = postArr.map((postObj) => {
            return {
              postId: postObj._id,
              username: postObj.createdBy.fullName,
              pictureURL: postObj.createdBy.pictureURL,
              content: postObj.content,
              createdAt: postObj.createdAt,
              tags: postObj.tags,
              likes: postObj.likes,
              commentNumber: postObj.commentNumber,
              link: postObj.link,
              attachment: postObj.attachment,
              comments: postObj.comments.map((commentObj) => {
                return {
                  commentId: commentObj._id,
                  username: commentObj.createdBy.username,
                  pictureURL: commentObj.createdBy.pictureURL,
                  content: commentObj.content,
                  createdAt: commentObj.createdAt,
                  likes: commentObj.likes
                };
              })
            };
          });
          res.json({ posts: posts, lastRefresh: new Date() });
        })
        .catch((er) => {
          console.log('eror in aws save fetching recent posts', er);
          res.json(er);
        });
    })
    .catch((error) => console.log('error in aws db save', error));
  });
});

module.exports = router;
