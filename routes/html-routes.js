// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
// Routes
// =============================================================
module.exports = function(app) {



/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index');
  //res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/about', function(req, res, next) {
  res.render('about');

});

app.get('/signup', function(req, res, next) {
  res.render('signup');
 
});


app.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/');
 
 });


app.get('/login', passport.authenticate('auth0', {
  clientID: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.AUTH0_CALLBACK_URL,
  responseType: 'code',
  audience: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'}),
  function(req, res) {
    res.redirect("/");
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
};