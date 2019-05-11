/**
 * This middleware is used to validate the login information.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var md5Encryption = require('../service/pwdEncryption');


/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***login***get***');
  res.render('index', { title: 'Express' });
});


/* validation of the login email and password */
router.post('/', function(req, res, next) {
  console.log("***login***post***");

  var loginEmail = req.body.loginEmail;
  var loginPassword =req.body.loginPassword;

  var handleData = require('../mongoDB/handleData');
  var condition = {"email": loginEmail, "pwd": md5Encryption.encryptPwd(loginEmail,loginPassword)};

  handleData.searchUser(condition, function(err, user){
    if(err) throw err;

    if(!user){
      console.log(user);// if the user is not in db, user would be null.
      return res.send({errInfo:1});// error 1: can not find in db.
    }

    req.session.user=user;
    res.render('index',{user:user});// successful login
  });

});


module.exports = router;
