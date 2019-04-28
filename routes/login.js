require('../mongoDB/tools/connection');//connect to database;
var express = require('express');
var router = express.Router();
var md5 = require('blueimp-md5');
var User = require('../mongoDB/models/user');


/* GET home page after login. */
router.get('/', function(req, res, next) {
  console.log('***login***get***');
  res.render('index', { title: 'Express' });
});

// validation of the login email and password
router.post('/', function(req, res, next) {
  console.log("***login***post***");
  console.log(req.body.loginEmail);
  console.log(req.body.loginPassword);

  var loginEmail = req.body.loginEmail;
  var loginPassword =req.body.loginPassword;

  User.findOne({
    email: loginEmail,
    pwd:loginPassword
  },function(err, user){
    if(err) throw err;

    if(!user){
      console.log('can not find this user');
      console.log(user);// if the user is not in db, user would be null.
      // error 1: can not find in db.
      return res.send({errInfo:1});
    }

    req.session.user=user;

    // successful login
    res.render('index',{user:user});
  });

  console.log('*** check user done.')
});

module.exports = router;
