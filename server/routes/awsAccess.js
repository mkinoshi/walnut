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
    .then((user) => {
      console.log('user object after save. check new name!!!!', user.portfolio[0]);
      res.json({portfolio: user.portfolio});
    })
    .catch((error) => console.log('error in aws db save', error));
  });
  console.log('query....', req.query);
});

router.post('/upload/profile', upload.single('profile'), (req, res) => {
  const toSave = req.user._id + req.file.originalname + Date.now();
  console.log('in backend', toSave);
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
      console.log('user object after save. check new name!!!!', user);
      res.json({pictureURL: user.pictureURL});
    })
    .catch((error) => console.log('error in aws db save', error));
  });
  console.log('aws save', req.file, toSave);
});

router.post('/upload/post', upload.single('attach'), (req, res) => {
  console.log('testing', req.file, req.body.name, req.body.body, req.body.tags);
  const toSave = 'post/' + req.user._id + req.file.originalname + Date.now();
  console.log('in backend', toSave);
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
      console.log(post);
      res.json({success: true});
    })
    .catch((error) => console.log('error in aws db save', error));
  });
});


// router.post('/save/post', (req, res) => {
//   const newPost = new Post({
//     content: req.body.postBody,
//     createdAt: new Date(),
//     createdBy: req.user._id,
//     likes: [],
//     tags: req.body.postTags,
//     comments: [],
//     commentNumber: 0,
//     community: req.user.currentCommunity
//   });
//   newPost.save()
//   .then(() => {
//     res.json({success: true});
//   })
//   .catch((e) => {
//     console.log(e);
//     res.json({success: false});
//   });
// });


module.exports = router;
