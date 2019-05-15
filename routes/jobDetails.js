/**
 * This middleware is used to get the job details.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var jobData = require('../service/jobData');
var cvData = require('../service/cvData');
var handleData = require('../mongoDB/handleData');


/* get all info of one specific job and render the result to jobDetails page  */
router.get('/', function(req, res) {
  console.log('***jobDetails***get***');

  var jobId = req.query.jobId;
  console.log('jobId:'+jobId);

  // get cv information of the user
    var cvObject;
    if(req.session.user){
        var cvId = req.session.user.cv;
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
           res.render('jobDetails',{user:req.session.user,'job':job,'cv':cvObject});
       } else { // cannot find this job
           console.log('cannot find this job.');
           res.render('jobDetails',{user:req.session.user});
       }
    });
});


/**
 * add cv info if there does not exist cv or update the previous cv
 */
router.post('/', function(req, res) {
    console.log('***jobDetails***post***');

    var achievement = req.body.achievement;
    var education = req.body.education;
    var workExperience = req.body.workExperience;

    console.log('1111111111111111');
    var userId = req.session.user._id;
    console.log('222222222222222');

    var companyName = req.body.companyName;
    var jobTitle = req.body.jobTitle;
    var jobId = req.body.jobId;

    console.log('userId:'+userId+',userName:'+req.session.user.name+',achievement:'+achievement+',education:'+education+',workExperience:'+workExperience);

    // insert cv info into the database
    var cvId="";
    handleData.addCvIntoUser(userId,achievement,education,workExperience,function (err,userObject) {
        if(err) {
            res.json({'result':0,'user':req.session.user,'jobTitle':jobTitle,'companyName':companyName,'jobId':jobId});
            throw err;
        }


        if(userObject){
            cvId=userObject.cv;
            console.log('insert cv successfully. cvId:'+cvId);
        }
    });

    cvData.sendCv(cvId,companyName,jobTitle,function (err,cvConnCompany) {
        if(err) {
            res.json({'result':0,'user':req.session.user,'jobTitle':jobTitle,'companyName':companyName,'jobId':jobId});
            throw err;
        }
        if(cvConnCompany){
            console.log('insert cv link collection successfully.');
            console.log('cv jobTitle:'+cvConnCompany.jobTitle);
            res.json({'result':1,'user':req.session.user,'jobTitle':jobTitle,'companyName':companyName,'jobId':jobId});
        }
    });
});


module.exports = router;
