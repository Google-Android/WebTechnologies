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

  // validate the email and password
  handleData.searchUser({"email": loginEmail}, function(err, user){
      if(err) throw err;

      if(!user){
          console.log('cannot find this user.'+user);// if the user is not in db, user would be null.
          res.send({errInfo:0});// error 1: can not find in email db.
      } else if(loginPassword != md5Encryption.encryptPwd(loginEmail,loginPassword)){
          console.log('wrong password.')
          res.send({errInfo:1});
      } else {
          console.log('login successfully.')
          req.session.user=user;
          res.render('index',{user:user});// successful login
      }
  });

});


module.exports = router;
