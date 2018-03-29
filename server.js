// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************
var interests = require('./db/interests.js')
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

var db = require("./models");
var aws = require('aws-sdk');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

require('dotenv').config();

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
// Starts the server to begin listening
// =============================================================
db.sequelize.sync({force: true}).then(function(){
	for (var i = 0; i < interests.length; i++)
    {
    	db.Interest.upsert({id: interests[i].id, name: interests[i].name});
    }
    app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });
});



// var s3 = new AWS.S3();

// var s3Bucket = new AWS.S3( { params: {Bucket: 'codingproject2'} } )

// var data = {Key: imageName, Body: imageFile};
// s3Bucket.putObject(data, function(err, data){
//   if (err) 
//     { console.log('Error uploading data: ', data); 
//     } else {
//       console.log('succesfully uploaded the image!';
//     }
// });
