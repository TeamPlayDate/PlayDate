// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************
var interests = require('./db/interests.js')
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("app/public"));

// Routes
// =============================================================
//require("./app/routes/api-routes.js")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({}).then(function(){
	for (var i = 0; i < interests.length; i++)
    {
    	db.Interest.upsert({id: interests[i].id, name: interests[i].name});
    }
    app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });
});
