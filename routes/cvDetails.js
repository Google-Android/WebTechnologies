/**
 * this middleware is used to deal with cv details.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var cvData = require('../service/cvData');
var handleData = require('../mongoDB/handleData');


/**
 * get cv details according to cvId
 * @param cvId
 * @return user
 * @return cv
 * @return the owner of the cv
 */
router.get('/', function(req, res, next) {
    console.log('***cvDetails***get***');

    var cvId = req.query.cvId;
    console.log('cvId:'+cvId);

    // find cv according to cvId
    cvData.showWholeCv(cvId,function (err, cv) {
      if(err){
          console.log("err:"+err);
          throw err;
      }else{
          console.log("cv:"+cv);
          // find the owner of the cv according to cvId
          handleData.searchUser({'cv':cvId}, function(err, owner){
            if(err){
              console.log("err:"+err);
              throw err;
            } else {
              console.log("owner:"+owner);
              res.render('cvDetails', { user: req.session.user,'owner':owner,'cv':cv});
            }
          });
      }
    });

});


/**
 * This method has not been used.
 */
router.post('/', function(req, res) {
  console.log("***cvDetails***post***");
  res.render('cvDetails', { user: req.session.user});
});


module.exports = router;
