// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************
'use strict'

var interests = require('./db/interests.js')
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path')

// Require Handlebars.
var exphbs = require("express-handlebars");

var db = require("./models");
var aws = require('aws-sdk');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');
require('dotenv').config();
dotenv.load();

// const routes = require('./routes/index');
// const user = require('./routes/user');

//This will configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
    return done(null, profile);
  }
);


passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'shhhhhhhhh',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

// Handle auth failure error messages
// app.use(function(req, res, next) {
//  if (req && req.query && req.query.error) {
//    req.flash("error", req.query.error);
//  }
//  if (req && req.query && req.query.error_description) {
//    req.flash("error_description", req.query.error_description);
//  }
//  next();
// });

// // Check logged in
// app.use(function(req, res, next) {
//   res.locals.loggedIn = false;
//   if (req.session.passport && typeof req.session.passport.user != 'undefined') {
//     res.locals.loggedIn = true;
//   }
//   next();
// });

// // app.use('/', routes);
// // app.use('/user', user);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });



// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("app/public"));

// AWS.config.loadFromPath('./config/aws.json');

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
/*Setting up HandleBars in the view directory*/
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/*Setting up CSS, JS, and Images to Load from Public Directory*/
app.use(express.static(path.join(__dirname, '/public')));

// /*Setting port to 3000*/
// app.set('port', (process.env.PORT || 3000));

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({}).then(function(){
	for (var i = 0; i < interests.length; i++)
    {
    	db.interest.upsert({id: interests[i].id, name: interests[i].name});
    }
    app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });
});


// var s3 = new aws.S3();

// var s3Bucket = new aws.S3( { params: {Bucket: 'codingproject2'} } );

// var data = {Key: imageName, Body: imageFile};

// s3Bucket.putObject(data, function(err, data){
//   if (err) 
//     { console.log('Error uploading data: ', data); 
//     } else {
//       console.log('succesfully uploaded the image!');
//     }
// });
