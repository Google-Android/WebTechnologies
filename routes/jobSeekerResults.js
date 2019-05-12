var express = require('express');
var router = express.Router();


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***jobSeekerResults***get***');
  res.render('jobSeekerResults', {user:req.session.user});
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***jobSeekerResults***post***");

});


module.exports = router;
