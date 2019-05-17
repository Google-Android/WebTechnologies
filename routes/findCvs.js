/**
 * this middleware if used for finding cvs according to the conditions.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/**
 * get to findCvs page
 */
router.get('/', function(req, res) {
  console.log('***findCvs***get***');
  res.render('findCvs',{user:req.session.user});
});


/**
 * get the url with parameters and return it to ajax
 * @param operation
 * @param cvKeyword
 * @param cvLocation
 * @return url
 */
router.post('/', function(req, res) {
  console.log('***findCvs***post***');

  var operation = req.body.operation==null?"":req.body.operation;
  var cvKeyword = req.body.cvKeyword=null?"":req.body.cvKeyword;
  var cvLocation = req.body.cvLocation=null?"":req.body.cvLocation;
  var url = "/jobSeekerResults?operation="+operation+"&cvKeyword="+cvKeyword+"&cvLocation="+cvLocation;

  console.log(operation+","+cvKeyword+","+cvLocation+","+url);

  res.json({'url':url});
});


module.exports = router;
