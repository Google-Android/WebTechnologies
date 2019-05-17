/**
 * this middleware is used to post job request
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var cvData = require('../service/cvData');
var uploadService = require('../service/uploadService');
var commonTool = require('../service/commonTool');

var currentTime = Date.now();


/**
 * get the job request post page.
 * @param cvId
 * @return cv
 */
router.get('/', function(req, res, next) {
  console.log('***jobRequests***get***');

  var cvId = req.session.user.cv;
  console.log('cvId:'+cvId);

  // get the whole cv data by searching cvId
  cvData.showWholeCv(cvId,function (err, cv) {
      if(err){
          console.log("err:"+err);
          throw err;
          res.render('jobRequests', {user:req.session.user});
      } else {
          console.log("cv:"+cv);
          res.render('jobRequests', {user:req.session.user,'cv':cv});
      }
  });

});


/**
 * create a new job request
 * @param achievement
 * @param education
 * @param workExperience
 * @param requestJobTitle
 * @param requestJobType
 * @param requestJobIndustry
 * @param salary
 * @param route
 * @param postal_town
 * @param administrative_area_level_1
 * @param postal_code
 * @param country
 * @param cvId
 * @return result status to ajax
 */
router.post('/', uploadService.uploadFile(currentTime).single('requestProfilePhoto') , function(req, res) {
    console.log("***jobRequests***post***");
    console.dir("file:"+req.file.originalname);

    var achievement = req.body.achievement==null?"":req.body.achievement;
    var education = req.body.education==null?"":req.body.education;
    var workExperience = req.body.workExperience==null?"":req.body.workExperience;
    var requestJobTitle = req.body.requestJobTitle==null?"":req.body.requestJobTitle;
    var requestJobType = req.body.requestJobType==null?"":req.body.requestJobType;
    var requestJobIndustry = req.body.requestJobIndustry==null?"":req.body.requestJobIndustry;
    var salary = req.body.salary==null?"":req.body.salary;
    var route = req.body.route==null?"":req.body.route;
    var postal_town = req.body.postal_town==null?"":req.body.postal_town;
    var administrative_area_level_1 = req.body.administrative_area_level_1==null?"":req.body.administrative_area_level_1;
    var postal_code = req.body.postal_code==null?"":req.body.postal_code;
    var country = req.body.country==null?"":req.body.country;

    var cvId = req.session.user.cv;



    // create a new cv request and add it in database
    cvData.mainRequestInfo(cvId,achievement,education,workExperience,requestJobTitle,requestJobType,requestJobIndustry,
        salary,currentTime+'-'+req.file.originalname,route,postal_town, administrative_area_level_1,postal_code,
        country,commonTool.formatDate(new Date()),function (err,cv) {
          if(err){
              res.json({'result':2});
              console.log("err:"+err);
              throw err;
          } else {
              console.log("cv:"+cv);
              res.json({'result':1,'cvId':cv._id});
          }
    });

});

module.exports = router;
