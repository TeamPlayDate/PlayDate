var db = require("../models");
var aws = require('aws-sdk');

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
 //    if (req.query.user_id) {
 //      query.UserId = req.query.user_id;
 //    }
   
 //    db.Messages.findAll({
 //      where: query,
 //      include: [db.User]
 //    }).then(function(dbMessages) {
 //      res.json(dbMessages);
 //    });
 //  });

//grabs all messages
  app.get("/api/messages/:id", function(req, res) {
    db.Message.findAll({where: {
      recipient_id: req.params.id
    }}).then(function(results) {
      res.json(results);
    });
  });

//grabs all users
  app.get("/api/users/all", function(req, res) {
    db.User.findAll({}).then(function(results) {
      res.json(results);
    });
  });


//  //  create new user
//   app.post("/api/new", function(req, res) {
app.post("/api/user", function(req, res) {
    var userId;
    db.User.create({
      user_name: req.body.user_name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      picture: req.body.picture
    }).then(function(dbUser) {
       var count = 0;
       userId = dbUser.user_id;
       for (var i = 0; i<req.body.interests.length; i++)
      {
        db.User_Interest_Relationship.create({
            user_id: userId,
            interest_id: req.body.interests[i]
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


// create a new message 
 app.post("/api/newMessage", function(req, res) {
    db.Message.create({
      body: req.body.text,
      title: req.body.title,
      recipient_id: req.body.recipient_id,
      sender_id: req.body.sender_id
    }).then(function(dbMessage) {
      res.json(dbMessage);
    })
      .catch(function(err) {
      res.json(err);
      });
  });
 


//This function lets the user delete messages
  app.delete("/api/users/messages", function(req, res) {
    db.Messages.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMessage) {
      res.json(dbMessage);
    });
  });


//   update user information 
app.put("/api/user", function(req, res) {
     
     db.User.update({
      user_name: req.body.user_name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      picture: req.body.picture
      }, 
      {
          where: {
            user_id: req.body.user_id
          }
      
    }).then(function(dbUser) {
      
      db.User_Interest_Relationship.destroy({where: {user_id: req.body.user_id}}).then(function(){
          var count = 0;
          for (var i = 0; i<req.body.interests.length; i++)
          {
              db.User_Interest_Relationship.upsert({
                  user_id: req.body.user_id,
                  interest_id: req.body.interests[i]
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