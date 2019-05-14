/**
 *
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var findCvData = require('../service/findCvData');


/*  */
router.get('/', function(req, res) {
  console.log('***findCvs***get***');
  res.render('findCvs',{user:req.session.user});
});

router.post('/', function(req, res) {
    console.log('***findCvs***post***');

    var operation = req.body.operation=null?"":req.body.operation;

    if(operation == 'firstSearch'){
      var cvKeyword = req.body.cvKeyword=null?"":req.body.cvKeyword;
      var cvLocation = req.body.cvLocation=null?"":req.body.cvLocation;
      console.log('operation:'+operation+",cvKeyword:"+cvKeyword+",cvLocation:"+cvLocation);

      findCvData.searchCv(cvKeyword,cvLocation,function(err, cvs){
        if(err){
          console.log('err:'+err);
          throw err;
        }
        if(cvs){
          if(cvs.length == 0){
            console.log('cannot find cv according to the conditions.');
            res.json({'result':2});
          } else {
            console.log('find cv length:'+cvs.length);
            res.json({'result':1,'cvs':cvs});
          } 
        }
      });
    }

    
});


module.exports = router;
