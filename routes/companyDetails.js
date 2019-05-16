var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');
var jobData = require('../service/jobData');
var fs = require('fs');// use fs to create or access folder
var multer = require('multer');// use multer to upload file

/**
 * access the folder or create the folder when the folder does not exist.
 * @param folder
 */
var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};

// set the path of uploading file.
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

/**
 *
 */
router.get('/', function(req, res) {
  console.log('***companyDetails***get***');

  console.log("companyName:"+req.query.companyName);

  var companyName = req.query.companyName;

  var reviewsResult = null;
  reviewData.searchReview(companyName,function(err,reviews){
    if(err) throw err;

    if(reviews){// exists reviews for this company
      console.log('reviews size:'+reviews.length);
      reviewsResult=reviews;
    } 

    jobData.showAllJobsByCompanyName(companyName,function(err,jobs){
      if(err) throw err;

      if(jobs){
        console.log('jobs:\n'+jobs);
        res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':reviewsResult,'jobs':jobs});
      } else {
        res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':reviewsResult,'jobs':null});
      }
    });
  });
});

/*  */
router.post('/', upload.single('reviewImage') ,function(req, res) {
  console.log("***companyDetails***post***");
  console.dir("file:"+req.file.originalname);

  // if(req.session.user){ // have login already
    var username = req.session.user.name;
    var companyName = req.body.companyName;

    var reviewTitle = req.body.reviewTitle;
    var reviewRate = req.body.reviewRating;
    var reviewComment = req.body.reviewComment;
    console.log("username:"+username+",companyName:"+companyName+",reviewTitle:"+reviewTitle+",reviewRate:"+reviewRate+",reviewComment:"+reviewComment);


    reviewData.createReview(username,companyName,reviewRate,reviewComment,currentTime+'-'+req.file.originalname,reviewTitle,function(err,review){
        if(err){
            res.json({result:2});
            console.log("err:"+err);
            throw err;
        } else {
            console.log("review:"+review);
            res.json({result:1,review:review});
        }
    });

  // } else { // need to login first
  //   res.json({result:0});
  // }
});


module.exports = router;
