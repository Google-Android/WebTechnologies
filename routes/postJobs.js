var express = require('express');
var router = express.Router();


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***postJobs***get***');
  res.render('postJobs', { title: 'Express' });
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***postJobs***post***");

});


module.exports = router;
