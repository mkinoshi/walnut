import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
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
  storage: multerS3({
    s3: s3,
    bucket: 'walnut-test',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    // metadata: (req, file, cb) => {
    //   cb(null, { fieldName: file.fieldname });
    // },
    key: (req, file, cb) => {
      cb(null, req.user._id + Date.now().toString() + file.originalname);
    }
  })
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
  console.log('this is the profile pic from the upload', req.file);
  User.findById(req.user._id)
    .then((user) => {
      const url = req.file.location;
      user.pictureURL = url;
      return user.save();
    })
    .then((user) => {
      console.log('end of upload', user);
      res.json({user: user});
    })
    .catch((error) => console.log('error in aws db save', error));
});

router.post('/upload/post', upload.single('attach'), (req, res) => {
  console.log('upload', req.file);
  // console.log(JSON.parse(req.body.tags));
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
      url: req.file.location,
      type: req.file.mimetype,
    }
  });
  newPost.save()
    .then((post) => {
      let posts = [];
      let filters;
      if (req.body.useFilters) {
        if (typeof req.body.useFilters === 'object') {
          filters = req.body.useFilters;
        } else {
          filters = [req.body.useFilters];
        }
      } else {
        filters = [];
      }
      let filter;
      if (filters.length > 0) {
        filter =  { tags: { $in: filters }, community: req.user.currentCommunity, createdAt: { $gte: new Date(req.body.lastRefresh) } };
      } else {
        filter = {community: req.user.currentCommunity, createdAt: { $gte: new Date(req.body.lastRefresh) }};
      }
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

router.post('/download/post', upload.single('attach'), (req, res) => {
  s3.getObject({
    Bucket: 'walnut-test',
    Key: req.body.url,
  }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      return;
    }
    res.json({data: result});
  });
});

module.exports = router;
