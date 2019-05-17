/**
 * This middleware is used to register for a new user.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var handleData = require('../mongoDB/handleData');
var md5Ecryption = require('../service/pwdEncryption');


/**
 * get to register page
 */
router.get('/', function(req, res) {
    console.log('***register***get***');
});


/**
 * validation of all user information when doing registration.
 * result = 0: existed user;
 * result = 1: add new user successfully;
 * result = 2:fail to add the new user;
 */
router.post('/', function(req, res) {
    console.log("***register***post***");

    var condition;
    if(req.body.userCategory==='p'){
        condition ={"email":req.body.consumerEmail==null?"":req.body.consumerEmail};
    } else if(req.body.userCategory === 'c'){
        condition ={"email":req.body.companyEmail==null?"":req.body.companyEmail};
    }

    handleData.searchUser(condition,function (err,user) {
        if(err)
            throw err;

        if(!user){
            console.log('this user have not registered before. user:'+user);// user:null
            var userInfo;

            if(req.body.userCategory === 'p'){ // customer user
                userInfo = {
                    "email":req.body.consumerEmail,
                    "pwd":md5Ecryption.encryptPwd(req.body.consumerEmail,req.body.consumerPassword),
                    "personOrComp":req.body.userCategory,
                    "name":req.body.consumerFirstName,
                    "lastName":req.body.consumerLastName,
                    "question":req.body.consumerSecurityQuestion,
                    "answer":req.body.consumerSecurityAnswer
                };
            } else if(req.body.userCategory === 'c'){ // company user
                userInfo = {
                    "email":req.body.companyEmail,
                    "pwd":md5Ecryption.encryptPwd(req.body.companyEmail,req.body.companyPassword),
                    "personOrComp":req.body.userCategory,
                    "name":req.body.companyName,
                    "lastName":null,
                    "question":req.body.companySecurityQuestion,
                    "answer":req.body.companySecurityAnswer
                };
            }

            // insert new user into database
            handleData.insertUser(userInfo,function (err,user) {
                if(err){
                    res.json({result:2});
                    console.log("err:"+err);
                    throw err;
                } else {
                    console.log("user:"+user);
                    req.session.user=user;
                    res.json({result:1,user:user});
                }
            });

        } else {
            console.log("The user has been registered before.");
            res.json({result:0});
        }
    })
});


module.exports = router;
