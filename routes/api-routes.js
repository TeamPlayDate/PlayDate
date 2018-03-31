var db = require("../models");
var aws = require('aws-sdk');
var geocoder = require("geocoder");
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-1';

module.exports = function(app) {

  app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


 // app.get("/api/messages", function(req, res) {
 //    var query = {};
 //    if (req.query.id) {
 //      query.UserId = req.query.id;
 //    }
   
 //    db.messages.findAll({
 //      where: query,
 //      include: [db.user]
 //    }).then(function(dbMessages) {
 //      res.json(dbMessages);
 //    });
 //  });

//grabs all messages
  app.get("/api/messages/:id", ensureLoggedIn, function(req, res) {
    db.message.findAll({where: {
      recipientId: req.params.id
    }}).then(function(results) {
      res.json(results);
    });
  });

//grabs all users
  app.get("/api/users/all", ensureLoggedIn, function(req, res){
    db.user.findAll({
      include:[{model: db.user_interest_relationship,
          include: [{model: db.interest}]
      }]
    }).then(function(results){

       
    
    res.json(results);
    });
  });


//  //  create new user
//   app.post("/api/new", function(req, res) {
app.post("/api/user", ensureLoggedIn, function(req, res) {
    var userId;
    var zip = req.body.zipcode;
    var lat;
    var lon;

    geocoder.geocode(zip, function(err) {

    }).then(function(data){
    
    lat = data.geometry.location.latitude;
    lon = data.geometry.location.longitude;
    console.log(lat);
    console.log(lon);
    db.user.create({
      name: req.body.name,
      latitude: lat,
      longitude: lon,
      picture: req.body.picture
    }).then(function(dbUser) {
       var count = 0;
       userId = dbUser.id;
       for (var i = 0; i<req.body.interests.length; i++)
      {
        db.user_interest_relationship.create({
            userId: userId,
            interestId: req.body.interests[i]
        }).then(function(result){
            count++;
            if (count == req.body.interests.length)
            {
              res.json(dbUser);
            }
        }).catch(function(err) {
         console.log(err);
        });
      }
     
    }).catch(function(err) {
       res.json(err);
      });
    });
   
  });


// create a new message 
 app.post("/api/newMessage", ensureLoggedIn, function(req, res) {
    db.message.create({
      body: req.body.text,
      title: req.body.title,
      recipientId: req.body.recipientId,
      senderId: req.body.senderId
    }).then(function(dbMessage) {
      res.json(dbMessage);
    })
      .catch(function(err) {
      res.json(err);
      });
  });
 


//This function lets the user delete messages
  app.delete("/api/users/messages", ensureLoggedIn, function(req, res) {
    db.messages.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMessage) {
      res.json(dbMessage);
    });
  });


//   update user information 
app.put("/api/user", ensureLoggedIn, function(req, res) {
     
     db.user.update({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      picture: req.body.picture
      }, 
      {
          where: {
            id: req.body.id
          }
      
    }).then(function(dbUser) {
      
      db.user_interest_relationship.destroy({where: {id: req.body.id}}).then(function(){
          var count = 0;
          for (var i = 0; i<req.body.interests.length; i++)
          {
              db.user_interest_relationship.upsert({
                  userId: req.body.id,
                  interestId: req.body.interests[i]
              }).then(function(result){
                  count++;
                  if (count == req.body.interests.length)
                  {
                      res.json(dbUser);
                  }
                });
          }
          
    }).catch(function(err) {
         console.log(err);
    });
  }).catch(function(err) {
    res.json(err);
  });
 

});



}