//Require Express
var express = require("express");

// Require Path.
var path = require('path')

// Require Handlebars.
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3000;

/*Setting up HandleBars in the view directory*/
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/*Setting up CSS, JS, and Images to Load from Public Directory*/
app.use(express.static(path.join(__dirname, '/public')));

/*Setting port to 3000*/
app.set('port', (process.env.PORT || 3000));

/*Setting Handle Bar Route for Index page*/
app.get('/', function(req, res){
	res.render('index');
});

/*Setting Handle Bar Route for Index page*/
app.get('/about', function(req, res){
	res.render('about');
});

/*Setting the Server to start Listening*/
app.listen(app.get('port'), function(){
console.log("App now listening at localhost:" + app.get('port'));
});

