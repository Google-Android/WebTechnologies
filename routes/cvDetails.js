var express = require('express');
var router = express.Router();
var cvData = require('../service/cvData');

/* GET cv details page. */
router.get('/', function(req, res, next) {
  console.log('***cvDetails***get***');

  var cvId = req.query.cvId;
  console.log('cvId:'+cvId);

  cvData.showWholeCv(cvId,function (err, cv) {
      if(err){
          console.log("err:"+err);
          throw err;
          res.render('cvDetails', { user: req.session.user });
      } else {
          console.log("cv:"+cv);
          res.render('cvDetails', { user: req.session.user,'cv':cv});
      }
  });
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***cvDetails***post***");
  res.render('cvDetails', { user: req.session.user});
});


module.exports = router;
