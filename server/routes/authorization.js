// Add Passport-related auth routes here.
var  express = require('express');
var models = require('../models/models');
var User = models.User;
var Tag = models.Tag;
const Profile = models.Profile;
var router = express.Router();
var path = require('path');
var firebase = require('firebase');


/* GET home page. */
function auth(passport) {

  console.log(__dirname);

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
  router.post('/auth/signup', function(req, res) {
    req.check('username', "username cannot be empty").notEmpty();
    req.check('password', "password cannot be empty").notEmpty();
    req.check('passwordRepeat', "password has to match with the one you typed").notEmpty().equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
      var error_msg = {};
      errors.forEach(function(error) {
        error_msg[error.param] = error.msg
      })
      res.status(400);
      //res.redirect('/auth/signup', {project: req.body, error: error_msg}) // have to change
    } else {
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('firebase error', error);
        // ...
      });
      var new_user = new User({
        fullName: req.body.fname + ' ' + req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        preferences: req.body.tags,
        portfolio: [
          {name: 'media', data: []},
          {name: 'documents', data: []},
          {name: 'code', data: []},
          {name: 'design', data: []}
        ],
        pictureURL: 'https://s3-us-west-1.amazonaws.com/walnut-test/430-512.png'
      });
      return new_user.save()
      .then((doc) => {
        // console.log(doc);
        res.status(200);
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err);
      })
    }
  });

  router.get('/auth/login', function(req, res) {
    res.render('login');
  });

  router.post('/auth/login', function(req, res) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => {
      console.log('login worked');
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

  router.get('/auth/facebook', function(req, res) {
    var provider = new firebase.auth.FacebookAuthProvider();
    console.log('got here');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('facebook login worked', user);
    }).catch(function(error) {
      console.log('facebook login failed', error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
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

  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/app/walnuthome');
    }
  );

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

  return router;
}

module.exports = auth;
//export default auth;
