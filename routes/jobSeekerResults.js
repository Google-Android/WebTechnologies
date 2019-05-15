var express = require('express');
var router = express.Router();
var findCvData = require('../service/findCvData');

/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***jobSeekerResults***get***');

  var cvKeyword = req.query.cvKeyword==null?"":req.query.cvKeyword;
  var cvLocation = req.query.cvLocation==null?"":req.query.cvLocation;

  console.log("cvKeyword:"+cvKeyword+",cvLocation:"+cvLocation);

  findCvData.searchCv(cvKeyword,cvLocation,function(err, cvs){
    if(err){
      console.log('err:'+err);
      throw err;
    }
    if(cvs){
      if(cvs.length == 0){
        console.log('cannot find cv according to the conditions.');
        res.render('jobSeekerResults', {user:req.session.user,'firstKeyword':cvKeyword,'firstLocation':cvLocation});
      } else {
        console.log('find cv length:'+cvs.length);
        res.render('jobSeekerResults', {user:req.session.user,'cvs':cvs,'firstKeyword':cvKeyword,'firstLocation':cvLocation});
      } 
    }
  });

});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***jobSeekerResults***post***");

  var secondCvKeyword = req.body.secondCvKeyword==null?"":req.body.secondCvKeyword;
  var secondCvLocation = req.body.secondCvLocation==null?"":req.body.secondCvLocation;
  var cvSalary = req.body.cvSalary==null?"":req.body.cvSalary;
  var cvIndustry = req.body.cvIndustry==null?"":req.body.cvIndustry;
  var cvJobType = req.body.cvJobType==null?"":req.boby.cvJobType;
  console.log('search params:'+secondCvKeyword+","+secondCvLocation+","+cvSalary+","+cvIndustry+","+cvJobType);

  findCvData.secondarySearchCv(secondCvKeyword,secondCvLocation,cvJobType,cvSalary,cvIndustry,function(err,cvs){
    if(err){
      console.log('err:'+err);
      throw err;
    }
    if(cvs){
      if(cvs.length == 0){
        console.log('cannot find cv according to the conditions.');
        res.json({'result':2});
      } else {
        console.log('find cvs'+cvs);
        res.json({'result':1,'cvs':cvs});
      } 
    }
  });



});


module.exports = router;
