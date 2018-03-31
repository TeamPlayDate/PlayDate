var db = require("../models");
var aws = require('aws-sdk');
var geocoder = require("geocoder");
var request = require("request-promise");

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
  app.get("/api/messages/", ensureLoggedIn, function(req, res) {
    db.message.findAll({where: {
      recipientId: req.user.user_id
    }}).then(function(results) {
      
      res.render("messages",{messsages:results});
    });
  });

//grabs all users
  app.get("/api/users/all", ensureLoggedIn, function(req, res){
    

    db.user.findOne({include:[{model: db.user_interest_relationship,
          include: [{model: db.interest}]
      }],
      where: {
        id: req.user.user_id
      }
    }).then(function(user){
    db.user.findAll({
      include:[{model: db.user_interest_relationship,
          include: [{model: db.interest}]
      }]
    }).then(function(results){
       
       var users = [];
       for(var i = 0; i <results.length; i++)
       {
            console.log(results[i].user_interest_relationships[i].interest);

            var friend = results[i];
            
            if (friend.id != user.id)
            {
            var matching = [];
            for (var j=0; j<friend.user_interest_relationships.length; j++)
            {
                for (var k=0; k<user.user_interest_relationships.length; k++)
                {
                    if(friend.user_interest_relationships[j].interestId==user.user_interest_relationships[k].interestId)
                    {
                        matching.push(friend.user_interest_relationships[j].interest.name);
                    }
                }
            }
            friend.common = matching;
            users.push[friend];
            console.log(friend);
            }
       }
    
    res.render("friends",{friends:users});
    });
  });
  });


//  //  create new user
//   app.post("/api/new", function(req, res) {
app.post("/api/user", ensureLoggedIn, function(req, res) {
    console.log(req.body);
    var userId = req.user.user_id;
    var zip = req.body.zipcode;
    var lat;
    var lon;
    var api_key = process.env.API_KEY;
    

    request("https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zip+"&key="+api_key, function(err,data) {
    var body = JSON.parse(data.body);
    lat = body.results[0].geometry.location.lat;
    lon = body.results[0].geometry.location.lng;
    }).then(function(geo){

    db.user.create({
      id: userId,
      name: req.body.name,
      latitude: lat,
      longitude: lon,
      picture: req.body.picture
    }).then(function(dbUser) {
       var count = 0;
       var interests = req.body["interests[]"];
          for (var i = 0; i<interests.length; i++)
          {
              db.user_interest_relationship.upsert({
                  userId: userId,
                  interestId: interests[i]
              }).then(function(result){
                  count++;
                  if (count == interests.length)
                  {
                      res.json(dbUser);
                  }
                });
          }
     
    }).catch(function(err) {
       res.json(err);
      });
    });
   
  });

app.get('/user', ensureLoggedIn, function(req, res) {
  db.user.findOne({include:[{model: db.user_interest_relationship,
          include: [{model: db.interest}]
      }],
      where: {
        id: req.user.user_id
      }
    }).then(function(user){

      res.render('user',{user: user});
  });
});

// create a new message 
 app.post("/api/newMessage", ensureLoggedIn, function(req, res) {
    db.message.create({
      body: req.body.text,
      title: req.body.title,
      recipientId: req.body.recipientId,
      senderId: req.user.user_id
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
    var userId = req.user.user_id;
    var zip = req.body.zipcode;
    var lat;
    var lon;
    var api_key = process.env.API_KEY;

    request("https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zip+"&key="+api_key, function(err,data) {
    var body = JSON.parse(data.body);
    
    lat = body.results[0].geometry.location.lat;
    lon = body.results[0].geometry.location.lng;
    
     db.user.update({
      name: req.body.name,
      latitude: lat,
      longitude: lon,
      picture: req.body.picture
      }, 
      {
          where: {
            id: userId
          }
      
    }).then(function(dbUser) {
      
      db.user_interest_relationship.destroy({where: {id: userId}}).then(function(){
          var count = 0;
          var interests = req.body["interests[]"];
          for (var i = 0; i<interests.length; i++)
          {
              db.user_interest_relationship.upsert({
                  userId: userId,
                  interestId: interests[i]
              }).then(function(result){
                  count++;
                  if (count == interests.length)
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
});



}