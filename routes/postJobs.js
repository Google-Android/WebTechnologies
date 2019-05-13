/**
 * this middleware is used for posting job.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var jobData = require('../service/jobData');

var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};

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


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***postJobs***get***');
  res.render('postJobs', {user:req.session.user});
});


/* validation of the login email and password */
router.post('/', upload.single('JobImage'), function(req, res) {
  console.log("***postJobs***post***");

  var companyName = req.body.companyName;
  var companyEmail = req.body.companyEmail;
  var title = req.body.title;
  var jobType = req.body.requestJobType;
  var industry = req.body.requestJobIndustry;
  var salary = req.body.salary;
  var description = req.body.description;
  var street = req.body.street;
  var city = req.body.city;
  var state = req.body.state;
  var postalCode = req.body.postalCode;
  var country = req.body.country;

  console.log('title:'+title+",requestJobType:"+jobType+",requestJobIndustry:"+industry+",postSalary:"+salary
        +',description:'+description+",street:"+street+",city:"+city+",state:"+state+",postalCode:"+postalCode+",country:"+country);

  jobData.postJob(title,companyName,companyEmail,industry,jobType,salary,currentTime+'-'+req.file.originalname,description,formatDate(new Date()),street,city,state,postalCode,country,function (err,job) {
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

function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);//想要什么格式都可以随便自己拼
}


module.exports = router;
