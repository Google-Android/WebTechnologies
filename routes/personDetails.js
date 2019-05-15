var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');
var handleData = require('../mongoDB/handleData');
var fs = require('fs');
var multer = require('multer');

var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './public/image/';

createFolder(uploadFolder);

var currentTime = Date.now();
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,uploadFolder);
    },
    filename: function(req,file,cb){
        cb(null,currentTime+'-'+file.originalname);
    }
});

// set the upload path
var upload = multer({storage:storage});


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***personDetails***get***');

  // var operation = req.query.operation==null?"":req.query.operation;
  var ownerId = req.query.ownerId==null?"":req.query.ownerId;
  console.log('ownerId:'+ownerId);

  // if(operation == 'otherPersonDetails'){
    handleData.searchUser({_id:ownerId}, function(err,owner){
      if(err){
        console.log('err:'+err);
        throw err;
      }
      if(owner){
        console.log('owner:'+owner);
        reviewData.searchReview(owner.name, function(err, reviews){
          if(err){
            console.log('err:'+err);
            throw err;
          }
          if(reviews){
            console.log('reviews:\n'+reviews);
            res.render('personDetails', {'user':req.session.user,'owner':owner,'reviews':reviews});
          }
        });
      }
    });
});


/*  */
router.post('/', upload.single('reviewImage') ,function(req, res) {
  console.log("***personDetails***post***");
  console.dir("file:"+req.file.originalname);

  var username = req.session.user.name;
  var ownerName = req.body.ownerName;
  var reviewTitle = req.body.reviewTitle;
  var reviewRate = req.body.reviewRating;
  var reviewComment = req.body.reviewComment;
  console.log("username:"+username+",ownerName:"+ownerName+",reviewTitle:"+reviewTitle+",reviewRate:"+reviewRate+",reviewComment:"+reviewComment);

  reviewData.createReview(username,ownerName,reviewRate,reviewComment,currentTime+'-'+req.file.originalname,reviewTitle,function(err,review){
      if(err){
          res.json({result:2});
          console.log("err:"+err);
          throw err;
      } else {
          console.log("review:"+review);
          res.json({result:1,review:review});
      }
  });

});


module.exports = router;
