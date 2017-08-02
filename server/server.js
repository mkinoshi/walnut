var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var connect = process.env.MONGODB_URI;
var User = require('./models/models').User;
var cors = require('cors');

import { adminApp } from './firebaseAdmin';

var REQUIRED_ENV = "SECRET MONGODB_URI".split(" ");

REQUIRED_ENV.forEach(function(el) {
  if (!process.env[el]){
    console.error("Missing required env var " + el);
    process.exit(1);
  }
});


mongoose.connect(connect);
mongoose.Promise = global.Promise;

var models = require('./models/models');

//put in dbRoutes
var dbRoutes = require('./routes/databaseAccess.js');
var awsRoutes = require('./routes/awsAccess.js');
var auth = require('./routes/authorization');
var app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
//IF WE NEED TO SERVE SOME FILES (stylesheets, scripts, etc.), USE THIS:
// app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, *");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Passport
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // userToken: null
}));

// var hbs = require('express-handlebars')({
//   defaultLayout: 'main',
//   extname: '.hbs'
// });
// app.engine('hbs', hbs);
// app.set('views', path.join(__dirname, '..', 'views'));
// app.set('view engine', 'hbs');


// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//   models.User.findById(id, done);
// });
//
// // passport strategy
// passport.use(new LocalStrategy(function(username, password, done) {
//   // Find the user with the given username
//   models.User.findOne({ username: username }, function (err, user) {
//     // if there's an error, finish trying to authenticate (auth failed)
//     if (err) {
//       console.error('Error fetching user in LocalStrategy', err);
//       return done(err);
//     }
//     // if no user present, auth failed
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     // TODO encrypt this!!!
//     // if passwords do not match, auth failed
//     if (user.password !== password) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     // auth has has succeeded
//     return done(null, user);
//   });
// }
// ));
//
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     // TODO scrape groups
//      profileFields: ['id', 'displayName', 'photos']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.find({ facebookId: profile.id }, function(err, user) {
//       console.log(user)
//       console.log(profile)
//       if (user.length === 0) {
//         var new_user = new User({
//           username: profile.displayName,
//           pictureURL: profile.photos[0].value,
//           facebookId: profile.id
//         })
//         new_user.save(function(err) {
//           if (!err) {
//             cb(err, new_user);
//           }
//         })
//       } else {
//         cb(err, user[0])
//       }
//     })
//   }
// ));

app.use('/auth', auth);
app.use('/db', dbRoutes);
    app.use('/aws', awsRoutes);
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'build/index.html')); // For React/Redux
});




// make this dbRoutes when we have the database running


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
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
