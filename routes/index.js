/**
 * This middleware is used to show index page with user information.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/* GET index page. */
router.get('/', function(req, res) {
  console.log('***index***get***');
  var operation = req.query.operation==null?"":req.query.operation;
  if(operation == ""){
      //if user has been stored in session, the username will be shown on web page.
      if(req.session.user){
          res.render('index',{user:req.session.user});
      } else{
          res.render('index',{user:null});
      }
  } else if(operation == "logout"){
      //when processing logout, the session will be destroyed.
      req.session.destroy(function (err) {
          if(err){
            console.log('err:'+err);
          }
          res.redirect('/');
      })
  }
});


module.exports = router;
