var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
var User = require('./models/models').User;
var cors = require('cors');
import AdminApp from './firebaseAdmin';
var CryptoJS = require("crypto-js");

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
var dbGeneralRoutes = require('./routes/dbRoutes/dbGeneralRoutes');
var dbGetRoutes = require('./routes/dbRoutes/dbGetRoutes');
var dbSaveRoutes = require('./routes/dbRoutes/dbSaveRoutes');
var dbUpdateRoutes = require('./routes/dbRoutes/dbUpdateRoutes');
var awsRoutes = require('./routes/awsAccess');
var auth = require('./routes/authorization');
var app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());
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
  origin: '*'
};

app.use(cors(corsOptions));

// Passport
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // userToken: null
}));

app.use(function(req, res, next) {
  console.log(req.session.userMToken);
  if (req.session.userMToken) {
    const mongoIdByte = CryptoJS.AES.decrypt(req.session.userMToken.toString(), 'secret');
    const mongoId = mongoIdByte.toString(CryptoJS.enc.Utf8);
    User.findById(mongoId)
        .then((response) => {
          // console.log(response);
          req.user = response;
          next()
        })
  } else {
    req.user = undefined;
    next();
  }
})

app.get('/', function(req, res, next) {
  console.log('a');
  if (!req.user) {
    console.log('b');
    res.redirect('/login')
  } else {
    console.log('d');
    console.log(req.user);
    if (req.user.currentCommunity !== '') {
      console.log('c');
      User.findById(req.user._id)
          .populate('currentCommunity')
          .then((user) => {
              const url = '/community/' + user.currentCommunity.title.split(' ').join('') + '/discover';
              res.redirect(url);
          })
    }
    else {
      console.log('e');
      res.redirect('/walnuthome')
    }
  }
});

app.use('/auth', auth);
app.use('/db', dbGeneralRoutes);
app.use('/db/get', dbGetRoutes);
app.use('/db/save', dbSaveRoutes);
app.use('/db/update', dbUpdateRoutes);
app.use('/aws', awsRoutes);
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/*', (request, response) => {
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
