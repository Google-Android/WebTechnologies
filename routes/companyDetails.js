var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');

router.get('/', function(req, res) {
  console.log('***companyDetails***get***');

  console.log("companyName:"+req.query.companyName);

  var companyName = req.query.companyName;
  reviewData.searchReview(companyName,function(err,reviews){
    if(err) throw err;

    if(reviews){// exists reviews for this company
      console.log('reviews size:'+reviews.length);
      res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':reviews});
    } else { // no reviews for this company
      res.render('companyDetails', { user:req.session.user,'companyName':companyName,'reviews':null});
    }
  });

  //if user has been stored in session, the username will be shown on web page.
  // if(req.session.user){
  //   res.render('companyDetails', { title: 'Express' });
  // } else{
  //   res.render('companyDetails',{user:null});
  // }
});

/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***companyDetails***post***");

  if(req.session.user){ // have login already
    var username = req.session.user.name;
    var companyName = req.body.companyName;

    var reviewTitle = req.body.reviewTitle;
    var reviewRate = req.body.reviewRating;
    var reviewComment = req.body.reviewComment;
    var reviewImage = req.body.reviewImage;

    console.log("username:"+username+",companyName:"+companyName+",reviewTitle:"+reviewTitle+",reviewRate:"+reviewRate+",reviewComment:"+reviewComment+",reviewImage:"+reviewImage);

    reviewData.createReview(username,companyName,reviewRate,reviewComment,reviewImage,reviewTitle,function(err,review){
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
