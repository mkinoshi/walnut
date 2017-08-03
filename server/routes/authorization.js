// Add Passport-related auth routes here.
var  express = require('express');
var models = require('../models/models');
var User = models.User;
var Tag = models.Tag;
const Profile = models.Profile;
var router = express.Router();
var path = require('path');
import adminApp from '../firebaseAdmin';

  router.get('/auth/signup', function(req, res) {
    Tag.find({}, function(err, tags) {
      if (tags) {
        var tag_names = tags.map(function(tag) {
          return tag.name;
        })
      } else {
        var tag_names = [];
      }
      res.render('signup', {tags: tag_names}); //have to change
    })
  })
  // TODO: TEST REGISTRATION
  router.post('/signup', function(req, res) {
    console.log('req.body.token', req.body.token);
    console.log('adminApp', adminApp);
    req.session.userToken = req.body.token;
    console.log('req.session.userToken', req.session.userToken);
    adminApp.auth().verifyIdToken(req.body.token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      console.log('uid', uid);
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
        console.log('new user', doc);
        res.status(200);
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err);
      })
    }).catch(function(error) {
      // Handle error
      console.log('error with admin auth', error);
    });
  });

  router.get('/auth/login', function(req, res) {
    res.render('login');
  });

  router.post('/auth/login', function(req, res) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((result) => {
      console.log('result', result);
      res.redirect('/');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if (error) {
        console.log('could not login', error);
        res.redirect('/auth/login');
      }
    });
  //   passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/auth/login'
  // })
  });

  router.post('/facebook', function(req, res) {
    req.session.userToken = req.body.token;
    adminApp.auth().verifyIdToken(req.body.token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      console.log('uid here: ', uid);
      res.status(200);
    }).catch((error) => {console.log('error', error);})
    // firebase.auth().signInWithRedirect(provider);
    // firebase.auth().getRedirectResult().then(function(result) {
    //   if (result.credential) {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     var token = result.credential.accessToken;
    //     // ...
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    //   console.log('facebook login worked', user);
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   console.log('facebook login failed', error);
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });

    // passport.authenticate('facebook')
  });


  // router.get('/', function(req, res, next) {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       console.log('user was logged in', user);
  //       // if(req.user.hasProfile) {
  //       //   if (req.user.currentCommunity) {
  //       //       User.findById(req.user._id)
  //       //           .populate('currentCommunity')
  //       //           .then((user) => {
  //       //               const url = '/app/community/' + user.currentCommunity.title.split(' ').join('') + '/discover';
  //       //               res.redirect(url);
  //       //           })
  //       //   }
  //       //   else {
  //       //     res.redirect('/app/walnuthome')
  //       //   }
  //       // } else{
  //       //   res.redirect('/app/editprofile');
  //       // }
  //     } else {
  //       console.log('user not validated');
  //       res.redirect('/auth/login')
  //     }
  //   });
  // });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/auth/login');
  });

module.exports = router;
//export default auth;
