var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');
var fs = require('fs');
var multer = require('multer');

var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};

// var uploadFolder = './image/';
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
  reviewData.searchReview(companyName,function(err,reviews){
    if(err) throw err;

    if(reviews){// exists reviews for this company
      console.log('reviews size:'+reviews.length);
      console.log("personOrComp: "+req.session.user.personOrComp);
      res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':reviews});
    } else { // no reviews for this company
      res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':null});
    }
  });

});

/*  */
router.post('/', upload.single('reviewImage') ,function(req, res) {
  console.log("***companyDetails***post***");
  console.dir("file:"+req.file.originalname);

  if(req.session.user){ // have login already
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

  } else { // need to login first
    res.json({result:0});
  }
});


module.exports = router;
