/**
 * This middleware is used to validate the login information.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var handleData = require('../mongoDB/handleData');
var md5Ecryption = require('../service/pwdEncryption');

/* GET index page after login. */
router.get('/', function(req, res, next) {
  console.log('***forgotPassword***get***');
  res.render('forgotPassword', {user: req.session.user});
});


/* validation of the login email and password */
router.post('/', function(req, res) {
  console.log("***forgotPassword***post***");

  var operation = req.body.operation;
  if(operation == 'checkEmail'){
    var email = req.body.email;
    console.log('email:'+email);

    // check whether this email has been registered before.
    handleData.searchUser({'email':email},function (err, user) {
       if(err){
         throw err;
         console.log('err:'+err);
         res.json({'result':0});
       }
       if(!user){ // cannot find this email within existing users.
           res.json({'result':2});
       } else {
           res.json({'result':1,'securityQuestion':user.question,'securityAnswer':user.answer});
       }
    });
  } else if(operation == 'resetPwd'){
    var email = req.body.email;
    var secretAnswer = req.body.secretAnswer;
    console.log('email:'+email+",securityAnswer:"+secretAnswer);

    // check whether the security answer is right.
    handleData.searchUser({'email':email},function (err, user) {
        if(err){
            throw err;
            console.log('err:'+err);
            res.json({'result':0});
        }
        if(!user){ // cannot find this email within existing users.
            res.json({'result':2});
        } else {
          console.log('user answer:'+user.answer+", current answer:"+secretAnswer);
          if(user.answer == secretAnswer){ // right security answer
            var password = req.body.resetPassword;

            //update password
            handleData.changePassword(email,md5Ecryption.encryptPwd(email,password),function (err, user) {
                if(err){
                    throw err;
                    console.log('err:'+err);
                    res.json({'result':0});
                }
                if(user){
                    console.log('update password successfully. user:'+user);
                    res.json({'result':1});
                }
            });
          }
        }
    });
  }
});


module.exports = router;
