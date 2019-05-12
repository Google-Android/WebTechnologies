var express = require('express');
var router = express.Router();


/* GET index page after login. */
// router.get('/', function(req, res, next) {
//   console.log('***companyDetails***get***');
//   res.render('companyDetails', { title: 'Express' });
// });
router.get('/', function(req, res) {
  console.log('***index***get***');
  //if user has been stored in session, the username will be shown on web page.
  if(req.session.user){
    res.render('companyDetails', {user:req.session.user});

  } else{
    res.render('companyDetails',{user:null});
  }
});

/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***companyDetails***post***");

});


module.exports = router;
