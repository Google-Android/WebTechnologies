var express = require('express');
var router = express.Router();


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***userDetails***get***');
  res.render('userDetails', { title: 'Express' });
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***userDetails***post***");

});


module.exports = router;
