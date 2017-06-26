var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(passport) {

  //first route that gets hit
  router.get('/', function(req, res){
    if(req.user){
      //if logged in go to contacts
      res.redirect('/home')
    }else{
      //otherwise go to login
      res.redirect('/login')
    }
  })

  //get signup form
  router.get('/signup', function(req, res){
    res.render('signup')
  })

  router.post('/signup', function(req, res){
    //form validation
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    req.checkBody('passwordRepeat', 'Invalid repeat password').notEmpty().equals(req.body.password);
    var errors = req.validationErrors();

    if(errors){
      //return signup with form inputs and errors
      res.render('signup',{
        username: req.body.username,
        password: req.body.password,
        passwordRepeat: req.body.passwordRepeat,
        errors: errors,
      })
    } else{
      //encryption
      const passwordIn = req.body.password

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(passwordIn, salt, function(err, hash) {

          //creating new user object with two fields
          var newUser = new User({
            username: req.body.username,
            password: hash,
          });

          //save new user to mongodb
          newUser.save(function(err, user) {
          if (err) {
            //error in saving
            console.log(err);
            res.status(500).redirect('/signup');
            return;
          }else{
              //redirect to login
              console.log(user);
              res.redirect('/login');
            }
          });
        });
      });
    }
  })

  //render login
  router.get('/login', function(req, res){
    res.render('login')
  })

  //login passport validation
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }))

  //facebook passport validation on button click redirect to fb
  router.get('/auth/facebook', passport.authenticate('facebook'));

  //fb on return route where do i go if it fails or succeeds
  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
  }
);

  //twitter passport validation on button click redirect to twitter
  router.get('/api/twitter',
    passport.authenticate('twitter'));

  //fb on return route where do i go if it fails or succeeds
  router.get('/api/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
      function(req, res) {
    // Successful authentication, redirect home.
        res.redirect('/');
  });


  //get logout route
  router.get('/logout', function(req, res){
    //gets rid of session
    req.session.destroy(function (err) {
      res.redirect('/login');
    })
  })

  return router;
}
