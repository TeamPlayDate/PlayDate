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

//   app.get("/api/messages/all", function(req, res) {
//     Message.findAll({}).then(function(results) {
//       res.json(results);
//     });
//   });

//   app.get("/api/users/all", function(req, res) {
//     User.findAll({}).then(function(results) {
//       res.json(results);
//     });
//   });

//  // app.post
//  //  create new user
//   app.post("/api/new", function(req, res) {
// create a new message 
//   });

 


//   // app.delete
//   // delete messages

//   app.delete("/api/users/messages", function(req, res) {
//     db.User_name.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });



//   app.update
//   update user information 

//   // PUT route for updating todos. The updated todo will be available in req.body
//   app.put("/api/todos", function(req, res) {

//   });
};
