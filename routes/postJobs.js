/**
 * this middleware is used for posting job.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var jobData = require('../service/jobData');
var commonTool = require('../service/commonTool');
var uploadService = require('../service/uploadService');

// get the current timestamp and add it to the file name
var currentTime = Date.now();


/**
 * get postJobs page
 */
router.get('/', function(req, res, next) {
  console.log('***postJobs***get***');
  res.render('postJobs', {user:req.session.user});
});


/**
 * post a new job
 * @param companyName
 * @param companyEmail
 * @param title
 * @param jobType
 * @param industry
 * @param salary
 * @param description
 * @param street
 * @param city
 * @param state
 * @param postalCode
 * @param country
 * @param cityLat
 * @param cityLng
 * @return jobId
 * @return result status to ajax
 */
router.post('/', uploadService.uploadFile(currentTime).single('JobImage'), function(req, res) {
    console.log("***postJobs***post***");

    var companyName = req.body.companyName==null?"":req.body.companyName;
    var companyEmail = req.body.companyEmail==null?"":req.body.companyEmail;
    var title = req.body.title==null?"":req.body.title;
    var jobType = req.body.requestJobType==null?"":req.body.requestJobType;
    var industry = req.body.requestJobIndustry==null?"":req.body.requestJobIndustry;
    var salary = req.body.salary==null?"":req.body.salary;
    var description = req.body.description==null?"":req.body.description;
    var street = req.body.route==null?"":req.body.route;
    var city = req.body.postal_town==null?"":req.body.postal_town;
    var state = req.body.administrative_area_level_1==null?"":req.body.administrative_area_level_1;
    var postalCode = req.body.postal_code==null?"":req.body.postal_code;
    var country = req.body.country==null?"":req.body.country;
    var cityLat = req.body.cityLat==null?"":req.body.cityLat;
    var cityLng = req.body.cityLng==null?"":req.body.cityLng;

    console.log(companyName+','+companyEmail+','+title+","+jobType+","+industry+","+salary +','+description+","
        +street+","+city+","+state +","+postalCode +","+country+","+cityLat+","+cityLng);

    // add a new job in database
    jobData.postJob(title,companyName,companyEmail,industry,jobType,salary,currentTime+'-'+req.file.originalname,
        description,commonTool.formatDate(new Date()),street,city,state,postalCode,country,cityLat,cityLng,function (err,job) {
        if(err){
            res.json({'result':2});
            console.log("err:"+err);
            throw err;
        } else {
            console.log("job:"+job);
            res.json({'result':1,'jobId':job.id});
        }
    });


});


module.exports = router;
