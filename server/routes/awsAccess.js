import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
// TODO user models with new db layout
import {User} from '../models/models';

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

router.post('/upload', upload.single('demo'), (req, res) => {
  const toSave = req.user._id + req.file.originalname + Date.now();
  console.log('htuhuhdusdsudhushudshdsd', req.file);
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
    User.findOne({owner: req.user._id})
    .then((user) => {
      const newFile = {
        fileName: req.query.name,
        fileType: req.file.mimetype,
        fileUrl: process.env.AWS_BUCKET_URL + toSave
      };
      user.portfolio[req.query.port].push(newFile);
      return user.save();
    })
    .then((user) => {
      console.log('fefeefefefefefegef', user);
      res.json({portfolio: user.portfolio});
    });
  });

  console.log('FILE', req.file);
  // finding user object in db
  console.log('USER for db save', req.user._id);
  // object key of where the links get stored
  console.log('media placement', req.query.port);

  // TODO in response send the file link to tempFiles, while it is getting saved
  res.send('DONE');

  // TODO : req.file. fieldname, mimetype, originalname save to database

  // { fieldname: 'theseNamesMustMatch',
  // originalname: 'Screen Shot 2017-07-20 at 10.39.11 AM.png',
  // encoding: '7bit',
  // mimetype: 'image/png',
  // buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 0a 00 00 00 06 40 08 06 00 00 00 b5 ac 1b c0 00 00 0c 13 69 43 43 50 49 43 43 20 50 72 6f 66 69 ... >,
  // size: 1266247
});


module.exports = router;
