/**
* this middleware is used to handle the user details, including person users and the company users.
* @type {createApplication}
*/
var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');
var cvData = require('../service/cvData');
var handleData = require('../mongoDB/handleData');
var jobData = require('../service/jobData');


/**
* get all reviews and cv as person user or get all reviews and jobs as company user
* @param operation: deleteJob or not
* @param jobId
* @param userName
* @return reviews
* @return cv
* @return jobs
*/
router.get('/', function(req, res, next) {
console.log('***consumerUserDetails***get***');

var operation = req.query.operation==null?"":req.query.operation;

  if(operation == 'deleteJob'){

    var jobId = req.query.jobId;
    console.log('jobId:'+jobId);

    // update the job into unUsed status according to jobId.
    jobData.deleteJob(jobId, function(err,job){
      if(err){
        console.log('err:'+err);
        throw err;
      }
      if(job){
        console.log('the unUsed job:'+job);
      }
      res.redirect('/consumerUserDetails');
    });

  } else {

    var userName = req.session.user.name;
    console.log('userId:'+userName);

    //find reviews to this user by searching userName in database
    reviewData.searchReview(userName,function (err, reviews) {
      if(err){
        console.log('err:'+err);
        throw err;
      }
      // exists reviews for this user
      if(reviews){
        console.log('reviews size:'+reviews.length);
      }

      if(req.session.user.personOrComp == 'p'){ // person user
        var cvId = req.session.user.cv;

        // get cv according to cvId.
        cvData.showCv(cvId,function(err, cv){
          if(err){
            console.log('err:'+err);
            throw err;
          }
          if(cv){ // find cv of this user
            console.log('find cv:'+cv);
          }
          console.log('reviews:'+reviews+",cv:"+cv);
          res.render('consumerUserDetails', { user:req.session.user,'reviews':reviews,'cv':cv});
        });
      } else if(req.session.user.personOrComp == 'c'){ // company user

        // get all jobs posted by this company
        jobData.showAllJobsByCompanyName(userName, function(err, jobs){
          if(err){
            console.log('err:'+err);
            throw err;
          }
          if(jobs){ // find all jobs posted by this company
            console.log('find jobs:'+jobs);
          }
          console.log('reviews:'+reviews+",jobs:"+jobs);
          res.render('consumerUserDetails', { user:req.session.user,'reviews':reviews,'jobs':jobs});
        });

      }

    });

  }

});


/**
 * add or update cv of the user
 * @param userId
 * @param achievement
 * @param education
 * @param workExperience
 * @param operation
 */
router.post('/', function(req, res, next) {
  console.log("***consumerUserDetails***post***");

  var userId = req.session.user._id;
  var achievement = req.body.achievement==null?"":req.body.achievement;
  var education = req.body.education==null?"":req.body.education;
  var workExperience = req.body.workExperience==null?"":req.body.workExperience;
  var operation = req.body.operation==null?"":req.body.operation;

  console.log(userId+","+achievement+","+education+","+workExperience+","+operation);

  // insert or update cv info into the database
  handleData.addCvIntoUser(userId,achievement,education,workExperience,function (err,userObject) {
    if(err) {
      console.log('err:'+err);
      res.json({'result':0});
      throw err;
    }
    if(userObject){
      console.log('insert or update cv successfully. cvId:'+userObject.cv);
      res.json({'result':1});
    } else {
      console.log('fail to insert or update cv.');
    }
  });
});


module.exports = router;
