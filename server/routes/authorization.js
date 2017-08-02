// Add Passport-related auth routes here.
var  express = require('express');
var models = require('../models/models');
var User = models.User;
var Tag = models.Tag;
const Profile = models.Profile;
var router = express.Router();
var path = require('path');


/* GET home page. */
function auth(passport) {


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
          email: ''
        },
        pictureURL: 'https://s3-us-west-1.amazonaws.com/walnut-test/430-512.png'
      });
      return new_user.save()
      .then((doc) => {
        res.status(200);
        res.redirect('/auth/login')
      })
      .catch((err) => {
        console.log(err);
      })
    }
  });

  router.get('/auth/login', function(req, res) {
    res.render('login');
  });

  router.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  }));

  router.get('/auth/facebook', passport.authenticate('facebook'));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/app/walnuthome');
    }
  );

  router.get('/', function(req, res, next) {
    if (!req.user) {
      res.redirect('/auth/login')
    } else {
      if(req.user.hasProfile) {
          if (req.user.currentCommunity) {
              User.findById(req.user._id)
                  .populate('currentCommunity')
                  .then((user) => {
                      const url = '/app/community/' + user.currentCommunity.title.split(' ').join('') + '/discover';
                      res.redirect(url);
                  })
          }
          else {
            res.redirect('/app/walnuthome')
          }
      } else{
          res.redirect('/app/editprofile');
      }
    }
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/auth/login');
  });

  return router;
}

module.exports = auth;
//export default auth;
