var express = require('express');
var router = express.Router();
var reviewData = require('../service/reviewData');

router.get('/', function(req, res) {
  console.log('***companyDetails***get***');

  console.log("companyName:"+req.query.companyName);

  var companyName = req.query.companyName;
  reviewData.searchReview(companyName,function(err,reviews){
    if(err) throw err;

    if(reviews){// exists reviews for this company
      console.log('reviews size:'+reviews.length);
      res.render('companyDetails', { user:req.session.user,'reviews':reviews});
    } else { // no reviews for this company
      res.render('companyDetails', { user:req.session.user,'reviews':null});
    }
  });

  //if user has been stored in session, the username will be shown on web page.
  // if(req.session.user){
  //   res.render('companyDetails', { title: 'Express' });
  // } else{
  //   res.render('companyDetails',{user:null});
  // }
});

/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***companyDetails***post***");

});


module.exports = router;
