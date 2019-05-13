var express = require('express');
var router = express.Router();


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***cvDetails***get***');
  res.render('cvDetails', { user: req.session.user });
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***cvDetails***post***");
  res.render('cvDetails', { user: req.session.user});
});


module.exports = router;
