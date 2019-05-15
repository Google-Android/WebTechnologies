var express = require('express');
var router = express.Router();
var cvData = require('../service/cvData');
var handleData = require('../mongoDB/handleData');

/* GET cv details page. */
router.get('/', function(req, res, next) {
  console.log('***cvDetails***get***');

  var operation = req.query.operation;
  var cvId = req.query.cvId;
  console.log('operation:'+operation+',cvId:'+cvId);

  if(operation == 'showMyCv'){
    cvData.showWholeCv(cvId,function (err, cv) {
      if(err){
          console.log("err:"+err);
          throw err;
      } else {
          console.log("cv:"+cv);
          res.render('cvDetails', { user: req.session.user,'cv':cv});
      }
    });
  } else if(operation == 'showOthersCv'){

    cvData.showWholeCv(cvId,function (err, cv) {
      if(err){
          console.log("err:"+err);
          throw err;
      } else {
          console.log("cv:"+cv);
          handleData.searchUser({'cv':cvId}, function(err, owner){
            if(err){
              console.log("err:"+err);
              throw err;
            } else {
              console.log("owner:"+owner);
              // res.render('cvDetails', { 'cv':cv});
              res.render('cvDetails', { user: req.session.user,'owner':owner,'cv':cv});
          }
          });
      }
    });
    
  }

  

 
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***cvDetails***post***");
  res.render('cvDetails', { user: req.session.user});
});


module.exports = router;
