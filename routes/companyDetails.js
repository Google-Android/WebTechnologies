/**
 * This middleware is used for getting company details.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');
var jobData = require('../service/jobData');
var uploadService = require('../service/uploadService');

// get current time and add this timestamp to the file name.
var currentTime = Date.now();


/**
 * get all reviews and jobs according to company name.
 * @param companyName
 * @return all reviews to this company
 * @return all jobs posted by this company
 */
router.get('/', function(req, res) {
  console.log('***companyDetails***get***');

  var companyName = req.query.companyName;
  console.log("companyName:"+companyName);

  // get all reviews to this company
  reviewData.searchReview(companyName,function(err,reviews){
    if(err) throw err;

    if(reviews){// exists reviews for this company
      console.log('reviews size:'+reviews.length);
    }

    // find all jobs posted by this company
    jobData.showAllJobsByCompanyName(companyName,function(err,jobs){
      if(err) throw err;

      if(jobs){
        console.log('jobs:\n'+jobs);
        res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':reviews,'jobs':jobs});
      } else {
        res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':reviews,'jobs':null});
      }

    });
  });
});


/**
 * post a new review of the company
 * @param username
 * @param companyName
 * @param reviewTitle
 * @param reviewRate
 * @param reviewComment
 * @return result status code to ajax, 1:success, 2:fail
 */
router.post('/', uploadService.uploadFile(currentTime).single('reviewImage') ,function(req, res) {
  console.log("***companyDetails***post***");
  console.dir("file:"+req.file.originalname);

    var username = req.session.user.name;
    var companyName = req.body.companyName;
    var reviewTitle = req.body.reviewTitle;
    var reviewRate = req.body.reviewRating;
    var reviewComment = req.body.reviewComment;
    console.log("username:"+username+",companyName:"+companyName+",reviewTitle:"+reviewTitle+",reviewRate:"+reviewRate+",reviewComment:"+reviewComment);

    // create a new review.
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
});


module.exports = router;
