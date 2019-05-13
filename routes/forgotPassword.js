/**
 * This middleware is used to validate the login information.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***forgotPassword***get***');
  res.render('forgotPassword', {user: req.session.user});
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***forgotPassword***post***");
  res.render('forgotPassword', {user: req.session.user});
});


module.exports = router;
