var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');
var cvData = require('../service/cvData');
var handleData = require('../mongoDB/handleData');
var jobData = require('../service/jobData');

/* GET user Details page. */
router.get('/', function(req, res, next) {
  console.log('***consumerUserDetails***get***');

  var operation = req.query.operation==null?"":req.query.operation;
  if(operation == 'deleteJob'){
    var jobId = req.query.jobId;
    console.log('jobId:'+jobId);
    jobData.deleteJob(jobId, function(err,job){
      if(err){
        console.log('err:'+err);
        throw err;
      }
      if(job){// delete job
        console.log('delete job:'+job);
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
      if(reviews){// exists reviews for this user
        console.log('reviews size:'+reviews.length);
      }
  
      if(req.session.user.personOrComp == 'p'){ // consumer user
        var cvId = req.session.user.cv;
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


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***consumerUserDetails***post***");

  var userId = req.session.user._id;
  var achievement = req.body.achievement==null?"":req.body.achievement;
  var education = req.body.education==null?"":req.body.education;
  var workExperience = req.body.workExperience==null?"":req.body.workExperience;

  var operation = req.body.operation;

  console.log('userId:'+userId+",achievement:"+achievement+",education:"+education+",workExperience:"+workExperience+",operation:"+operation);

  if(operation == 'updateCv'){
     // insert or update cv info into the database
     var cvId="";
     console.log('11111');
     handleData.addCvIntoUser(userId,achievement,education,workExperience,function (err,userObject) {
      console.log('2222');
      if(err) {
          console.log('err:'+err);
          res.json({'result':0});
          throw err;
        }
        if(userObject){
          cvId=userObject.cv;
          console.log('insert or update cv successfully. cvId:'+cvId);
          res.json({'result':1});
        } else {
          console.log('fail to insert or update cv.');
        }
     });
  }
});


module.exports = router;
