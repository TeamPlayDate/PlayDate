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
  app.get("/api/messages/all", function(req, res) {
    Messages.findAll({}).then(function(results) {
      res.json(results);
    });
  });

//grabs all users
  app.get("/api/users/all", function(req, res) {
    User.findAll({}).then(function(results) {
      res.json(results);
    });
  });


//  //  create new user
//   app.post("/api/new", function(req, res) {
app.post("/api/user", function(req, res) {

    db.User.create({
      user_name: req.body.user_name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      picture: req.body.picture,
    }).then(function(dbUser) {
    	 for (var i = 0; i<req.body.interests.length; i++)
      {
        db.User_Interest_Relationship.create({
            user_id: dbUser.user_id,
            interest_id: interests[i]
        })
      }
      res.json(dbUser);
    })
      .catch(function(err) {
        res.json(err);
      });
  });


// create a new message 
 app.post("/api/newMessage", function(req, res) {
    db.Message.create({
      text: req.body.text,
      recipient: req.body.recipient_id,
      sender: req.body.sender_id
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
      picture: req.body.picture,
      }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      
      for (var i = 0; i<req.body.interests.length; i++)
      {
        db.User_Interest_Relationship.create({
            user_id: req.body.id,
            interest_id: interests[i]
        })
      }
      res.json(dbUser);
    })
      .catch(function(err) {
       res.json(err);
      });
  });

};
