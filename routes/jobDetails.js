/**
 * This middleware is used to get the job details.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var jobData = require('../service/jobData');
var cvData = require('../service/cvData');
var handleData = require('../mongoDB/handleData');


/**
 * get all info of one specific job and render the result to jobDetails page
 * @param jobId
 * @param user
 * @return job
 * @return cv
 * @return similarJobs
 */
router.get('/', function(req, res) {
    console.log('***jobDetails***get***');

    var jobId = req.query.jobId;
    console.log('jobId:'+jobId);

    // get cv information of the user
    var cvObject;
    if(req.session.user){ // if the user has login already
        var cvId = req.session.user.cv;
        console.log('cvId:'+cvId);

        // find cv by searching cvId and render this cv to jobDetails page
        cvData.showCv(cvId,function (err,cv) {
            if(err){
                res.json({'result':0, 'user':req.session.user});
                throw err;
            }
            if(cv){// find cv
                console.log('find cv:\n'+cv);
                cvObject=cv;
            }
        });
    }

    // get all info of one specific job from database
    jobData.showJobDetails(jobId,function(err, job){
       if(err) throw err;

       if(job){
           console.log('find job:\n'+job);

           // find all similar jobs
           var cityLat = req.session.latitude==null?"":req.session.latitude;
           var cityLng = req.session.longitude==null?"":req.session.longitude;
           console.log('cityLat:'+cityLat+',cityLng:'+cityLng);

           // find the similar job within 5 radius
           jobData.secondarySearchJob(job.title,"",cityLat,cityLng,5,"","","",
               function(err,similarJobs){
               if(err){
                   console.log('err:'+err);
                   throw err;
               }
               if(similarJobs){
                   console.log('similarJobs:\n'+similarJobs);
                   res.render('jobDetails',{user:req.session.user,'job':job,'cv':cvObject,'similarJobs':similarJobs});
               }
           });

       } else { // cannot find this job
           console.log('cannot find this job.');
           res.render('jobDetails',{user:req.session.user});
       }
    });

});


/**
 * add cv info if there does not exist cv or update the previous cv
 * @param achievement
 * @param education
 * @param workExperience
 * @param userId
 * @param username
 * @param companyName
 * @param jobTitle
 * @param jobId
 * @return cvId
 * @return jobTitle
 * @return companyName
 * @return jobId
 * @return userId
 * @return username
 */
router.post('/', function(req, res) {
    console.log('***jobDetails***post***');

    var achievement = req.body.achievement==null?"":req.body.achievement;
    var education = req.body.education==null?"":req.body.education;
    var workExperience = req.body.workExperience==null?"":req.body.workExperience;

    var userId = req.session.user._id;
    var username=req.session.user.name+" "+req.session.user.lastName;

    console.log(achievement+','+education+','+workExperience+','+userId+','+username);

    var companyName = req.body.companyName==null?"":req.body.companyName;
    var jobTitle = req.body.jobTitle==null?"":req.body.jobTitle;
    var jobId = req.body.jobId==null?"":req.body.jobId;

    console.log(companyName+','+jobTitle+','+jobId);

    // insert cv info into the database
    handleData.addCvIntoUser(userId,achievement,education,workExperience,function (err,userObject) {
        if(err) {
            res.json({'result':0,'user':req.session.user,'jobTitle':jobTitle,'companyName':companyName,'jobId':jobId});
            throw err;
        }

        if(userObject){
            var cvId=userObject.cv;
            console.log('insert cv successfully. cvId:'+cvId);

            // send cv to company
            cvData.sendCv(cvId,companyName,jobTitle,jobId, userId,username,function (err,cvConnCompany) {
                if(err) {
                    res.json({'result':0,'user':req.session.user,'jobTitle':jobTitle,'companyName':companyName,'jobId':jobId,'userId':userId,'username':username});
                    throw err;
                }
                if(cvConnCompany){
                    console.log('insert cv link collection successfully.');
                    res.json({'result':1,'user':req.session.user,'jobTitle':jobTitle,'companyName':companyName,'jobId':jobId, 'userId':userId, 'username':username});
                }
            });

        }

    });

});


module.exports = router;
