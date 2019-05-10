var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var handleData = require('../mongoDB/handleData');
var md5Ecryption = require('../service/pwdEncryption');


/* GET home page after login. */
router.get('/', function(req, res) {
    console.log('***register***get***');
});

// validation of the login email and password
router.post('/', function(req, res) {
    console.log("***register***post***");
    console.log(req.body);

    //0: existed user; 
    //1: add new user successfully; 
    //2:fail to add the new user.
    var condition;
    if(req.body.userCategory==='p'){
        condition ={"email":req.body.consumerEmail};
    } else if(req.body.userCategory === 'c'){
        condition ={"email":req.body.companyEmail};
    }

    handleData.searchUser(condition,function (err,user) {
        if(err)
            throw err;

        if(!user){
            console.log('can not find this user.'+user);// user:null
            // insert new user
            var userInfo;
            if(req.body.userCategory === 'p'){
                userInfo = {
                    "email":req.body.consumerEmail,
                    // "pwd":req.body.consumerPassword,
                    "pwd":md5Ecryption.encryptPwd(req.body.consumerEmail,req.body.consumerPassword),
                    "personOrComp":req.body.userCategory,
                    "name":req.body.consumerFirstName,
                    "lastName":req.body.consumerLastName,
                    "question":req.body.consumerSecurityQuestion,
                    "answer":req.body.consumerSecurityAnswer
                };
            } else if(req.body.userCategory === 'c'){
                userInfo = {
                    "email":req.body.companyEmail,
                    // "pwd":req.body.companyPassword,
                    "pwd":md5Ecryption.encryptPwd(req.body.companyEmail,req.body.companyPassword),
                    "personOrComp":req.body.userCategory,
                    "name":req.body.companyName,
                    "lastName":null,
                    "question":req.body.companySecurityQuestion,
                    "answer":req.body.companySecurityAnswer
                };
            }
            handleData.insertUser(userInfo,function (err,result) {
                if(err){
                    res.json({result:2});
                    console.log("err:"+err);
                    throw err;
                } else {
                    console.log("result:"+result);
                    res.json({result:1});
                }
            });
        } else {
            console.log("The user has been registered before.");
            res.json({result:0});
        }
    })
});

module.exports = router;
