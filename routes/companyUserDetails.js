var express = require('express');
var router = express.Router();


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***companyUserDetails***get***');
  res.render('companyUserDetails', { user: req.session.user });
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***companyUserDetails***post***");
  res.render('companyUserDetails', { user: req.session.user});
});


module.exports = router;
