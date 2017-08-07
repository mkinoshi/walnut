// Add Passport-related auth routes here.
var  express = require('express');
var models = require('../models/models');
var User = models.User;
var Tag = models.Tag;
const Profile = models.Profile;
var router = express.Router();
var path = require('path');
var CryptoJS = require("crypto-js");
import adminApp from '../firebaseAdmin';

  router.post('/signup', function(req, res) {
    // console.log('req.body.token', req.body.token);
    // console.log('adminApp', adminApp);
    req.session.userToken = req.body.token;
    //console.log('req.session.userToken', req.session.userToken);
    adminApp.auth().verifyIdToken(req.body.token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      // console.log('uid', uid);
      var new_user = new User({
        firebaseId: uid,
        fullName: req.body.fname + ' ' + req.body.lname,
        username: req.body.username,
        password: req.body.password,
        preferences: req.body.tags,
        portfolio: [
          {name: 'media', data: []},
          {name: 'documents', data: []},
          {name: 'code', data: []},
          {name: 'design', data: []}
        ],
        contact: {
          phones: [],
          email: [req.body.email]
        },
        communities: [],
        pictureURL: 'https://s3-us-west-1.amazonaws.com/walnut-test/430-512.png'
      });
      return new_user.save()
      .then((doc) => {
        console.log(doc._id);
        const token = CryptoJS.AES.encrypt(doc._id.toString(), 'secret').toString();
        req.session.userMToken = token;
        console.log(req.session, 'doc register', doc);
        res.send({success: true, user: doc});
      })
      .catch((err) => {
        console.log(err);
      })
    }).catch(function(error) {
      // Handle error
      console.log('error with admin auth', error);
    });
  });

  router.post('/login', function(req, res) {
    req.session.userToken = req.body.token;
    adminApp.auth().verifyIdToken(req.body.token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      // console.log('uid', uid);
      return User.findOne({firebaseId: uid})
      .then((doc) => {
        console.log(doc._id);
        const token = CryptoJS.AES.encrypt(doc._id.toString(), 'secret').toString();
        req.session.userMToken = token;
        console.log(req.session, 'doc login', doc);
        res.send({success: true, user: doc});
      })
      .catch((err) => {
        console.log(err);
      })
    }).catch(function(error) {
      // Handle error
      console.log('error with admin auth', error);
    });
  });

  router.post('/facebook', function(req, res) {
    req.session.userToken = req.body.token;
    adminApp.auth().verifyIdToken(req.body.token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      console.log('uid here: ', uid);
      res.status(200);
    }).catch((error) => {console.log('error', error);})
  });

  router.get('/logout', function(req, res) {
    localStorage.removeItem('isUserInCommunity');
    req.logout();
    res.redirect('/app/login');
  });

  // return router;
// }
module.exports = router;
// export default auth;
