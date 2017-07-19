// Add Passport-related auth routes here.
var  express = require('express');
var models = require('../models/models');
var User = models.User;
var Tag = models.Tag;
const UserProfile = models.UserProfile;
var router = express.Router();
var path = require('path');


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
      var new_user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        preferences: req.body.tags
      });
      new_user.save()
        .then((doc) => {
          console.log(doc);
          return doc
        })
        .then((doc) => {
          const newProf = new UserProfile({
              owner: doc._id,
              isCreated: false,
          });
          return newProf.save()
        })
        .then((doc2) => {
            console.log(doc2);
            res.status(200);
            res.redirect('/auth/login')
        })
        .catch((err) => {
            console.log(err);
        })
    }
  })

  router.get('/auth/login', function(req, res) {
    res.render('login');
  })

  router.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/auth/login'
  }));

  router.get('/auth/facebook', passport.authenticate('facebook'));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/app');
    }
  );

  router.get('/', function(req, res, next) {
    if (!req.user) {
      res.redirect('/auth/login')
    } else {
      res.redirect('/app');
    }
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  })

  return router;
}

module.exports = auth;
//export default auth;
