/**
 * This middleware is used to validate the login information.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var md5Encryption = require('../service/pwdEncryption');
var handleData = require('../mongoDB/handleData');

/**
 * get to index page.
 */
router.get('/', function(req, res, next) {
  console.log('***login***get***');
  res.render('index', { title: 'Express' });
});


/**
 * validate the email and password.
 * if valid, then put the user into session.
 * @param loginEmail
 * @param loginPassword
 * @return user
 */
router.post('/', function(req, res, next) {
  console.log("***login***post***");

  var loginEmail = req.body.loginEmail==null?"":req.body.loginEmail;
  var loginPassword =req.body.loginPassword==null?"":req.body.loginPassword;
  console.log(loginEmail+','+loginPassword);

  var condition = {"email": loginEmail, "pwd": md5Encryption.encryptPwd(loginEmail,loginPassword)};

  // validate the email and password
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
