//require dependencies
//server
var express = require('express');
var path = require('path');
var logger = require('morgan');

//cookie
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//access to routes
var routes = require('./routes/index');
var auth = require('./routes/auth');

//db
var models = require('./models/models');
var User = models.User;

//passport
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var TwitterStrategy = require('passport-twitter');
var LocalStrategy = require('passport-local').Strategy;


//start express server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//express validator
var expressValidator = require('express-validator');
app.use(expressValidator());

//required middleware
//body and cookie parsers
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Passport stuff here
app.use(session({ secret: 'keyboard cat' }));

// serialize user to store in session in express session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

//deserialize user to get user object in req.user everytime there is a get route
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Tell passport how to read our user models
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log(user);
      return done(null, false);
    }

    // comparing hashed passwords
    bcrypt.compare(password, user.password, function(err, response) {
      if(response === true){
        //return user if password compare was successful
        return done(null, user);
      } else{
        //return false otherwise
        return done(null, false);
      }
    });
  });
}));

//facebook password strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    //make sure this gets changed to heroku
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos']
  },
  function(accessToken, refreshToken, profile, cb) {
    //query databas
    User.find({ facebookId: profile.id }, function (err, user) {
      if(err){
        console.log('error in querying database')
       }
       //if the user is an empty array
       else if(user.length === 0){
         //new obj
        var newUser = new User({
          username: profile.displayName,
          phone: fromNumber,
          facebookId: profile.id,
          pictureURL: profile.photos[0].value,
        })
        //save
        newUser.save(function(err, user){
          if(err){
            console.log('error in saving new facebook user to db', err);
          } else{
            //send to serialize
            return cb(null, user)
          }
        })
      }else{
        console.log(user)
        return cb(null, user[0]);
      }
    });
  }
));

//passport strategy for twitter
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/api/twitter/callback"
},function(accessToken, refreshToken, profile, cb) {
  //query database
  console.log(profile)
  User.find({ twitterId: profile.id }, function (err, user) {
    if(err){
      console.log('error in querying database')
    }
    //if the user is an empty array
    else if(user.length === 0){
      //new obj
      var newUser = new User({
        username: profile.displayName,
        phone: fromNumber,
        twitterId: profile.id,
        pictureURL: profile.photos[0].value,
      })
      //save
      newUser.save(function(err, user){
        if(err){
          console.log('error in saving new facebook user to db', err);
        } else{
          //send to serialize
          return cb(null, user)
        }
      })
    }else{
      console.log(user)
      return cb(null, user[0]);
    }
  });
}))

app.use(passport.initialize());
app.use(passport.session());

// Uncomment these out after you have implemented passport in step 1
app.use('/', auth(passport));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
