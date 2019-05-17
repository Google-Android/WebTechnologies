/**
 *  this middleware is used for personDetails page
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');
var handleData = require('../mongoDB/handleData');
var uploadService = require('../service/uploadService');

//get current timestamp and then add it to the file name.
var currentTime = Date.now();


/**
 * get the owner and reviews to this owner
 * @param ownerId
 * @return owner
 * @return reviews
 */
router.get('/', function(req, res) {
    console.log('***personDetails***get***');

    var ownerId = req.query.ownerId==null?"":req.query.ownerId;
    console.log('ownerId:'+ownerId);

    // search user by the ownerId
    handleData.searchUser({_id:ownerId}, function(err,owner){

        if(err){
            console.log('err:'+err);
            throw err;
        }

        if(owner){
            console.log('owner:'+owner);

            // get all reviews to this owner
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


/**
 * create a new review to one person user
 * @param username
 * @param ownerName
 * @param reviewTitle
 * @param reviewRate
 * @param reviewComment
 * @return review
 * @return result status to ajax
 */
router.post('/', uploadService.uploadFile(currentTime).single('reviewImage') ,function(req, res) {
  console.log("***personDetails***post***");
  console.dir("file:"+req.file.originalname);

  var username = req.session.user.name;
  var ownerName = req.body.ownerName;
  var reviewTitle = req.body.reviewTitle;
  var reviewRate = req.body.reviewRating;
  var reviewComment = req.body.reviewComment;
  console.log(username+","+ownerName+","+reviewTitle+","+reviewRate+","+reviewComment);

  // add a new review in database
  reviewData.createReview(username,ownerName,reviewRate,reviewComment,currentTime+'-'+req.file.originalname,
      reviewTitle,function(err,review){
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
