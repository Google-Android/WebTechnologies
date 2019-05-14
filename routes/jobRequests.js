var express = require('express');
var router = express.Router();
var cvData = require('../service/cvData');
var fs = require('fs');
var multer = require('multer');

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


/* validation of the login email and password */
router.post('/', upload.single('requestProfilePhoto') , function(req, res, next) {
  console.log("***jobRequests***post***");
  console.dir("file:"+req.file.originalname);

  var achievement = req.body.achievement;
  var education = req.body.education;
  var workExperience = req.body.workExperience;
  var requestJobTitle = req.body.requestJobTitle;
  var requestJobType = req.body.requestJobType;
  var requestJobIndustry = req.body.requestJobIndustry;
  var salary = req.body.salary;
  var route = req.body.route;
  var postal_town = req.body.postal_town;
  var administrative_area_level_1 = req.body.administrative_area_level_1;
  var postal_code = req.body.postal_code;
  var country = req.body.country;
  
  var cvId = req.session.user.cv;
  //cvId,accomplishment,edu,experience,jobName,type,jobIndustry,sal,picUrl,adStreet,adCity,adState,zipcode,adCoun,date,callback
  cvData.mainRequestInfo(cvId,achievement,education,workExperience,requestJobTitle,requestJobType,requestJobIndustry,
      salary,currentTime+'-'+req.file.originalname,route,postal_town, administrative_area_level_1,postal_code,
      country,formatDate(new Date()),function (err,cv) {
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
