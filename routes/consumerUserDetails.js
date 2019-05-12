var express = require('express');
var router = express.Router();


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***consumerUserDetails***get***');
  res.render('consumerUserDetails', { user: req.session.user });
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***consumerUserDetails***post***");
  res.render('consumerUserDetails', { user: req.session.user });
});


module.exports = router;
