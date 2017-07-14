// Add Passport-related auth routes here.
var  express = require('express');
var models = require('../models/models');
var User = models.User;
var router = express.Router();


/* GET home page. */
function auth(passport) {
  console.log("hehehehhehehe");

  router.get('/auth/signup', function(req, res) {
    res.render('signup') //have to change
  })

  router.post('/auth/signup', function(req, res) {
    req.check('username', "username cannot be empty").notEmpty();
    req.check('password', "password cannot be empty").notEmpty();
    req.check('repeated_password', "password has to match with the one you typed").notEmpty().equals(req.body.password);
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
          username: req.body.username,
          password: req.body.password
        })
        new_user.save()
                .then((doc) => {
                  console.log(doc)
                  res.status(200)
                  //res.redirect('/auth/login')
                  // if (err) {
                  //   res.status(400).send({"error": "could not save data"})
                  // } else {
                  //   res.redirect('/login');
                  // }
                })
    }
  })

  router.get('/auth/login', function(req, res) {
    res.send("hello");
    //res.render('login');
  })

  router.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  }));

  router.get('/', function(req, res, next) {
    console.log("yoyoyoyoyoyo");
    if (!req.user) {
      res.redirect('/auth/login')
    } else {
      next();
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
