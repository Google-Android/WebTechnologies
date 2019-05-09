require('../mongoDB/tools/connection');//connect to database;
var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var md5 = require('blueimp-md5');
var User = require('../mongoDB/models/user');

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
    var result;

    // check whether this user has been registered before
    if(req.body.userCategory === 'p'){
        User.findOne({
            email: req.body.consumerEmail
         },function (err,user) {
            if(!err){
                console.log("The customer user has been registered before.");
                res.json({result:0});
            } else {
                // insert user info into user collection
                User.create({
                    email:req.body.consumerEmail,
                    pwd:req.body.consumerPassword,
                    personOrComp:req.body.userCategory,
                    name:req.body.consumerFirstName,
                    lastName:req.body.consumerLastName,
                    question:req.body.consumerSecurityQuestion,
                    answer:req.body.consumerSecurityAnswer
                },function(err){
                    if(!err){
                        res.json({result:1});// sucess
                        console.log("insert succesfully.");
                    } else {
                        res.json({result:2});//fail
                        console.log("insert failed.");
                    }
                });
            }
        });
    } else {
        User.findOne({
            email: req.body.companyEmail
         },function (err,user) {
            if(!err){
                console.log("The company user has been registered before.");
                res.json({result:0});
            } else {
                // insert user info into user collection
                User.create({
                    email:req.body.companyEmail,
                    pwd:req.body.companyPassword,
                    personOrComp:req.body.userCategory,
                    name:req.body.companyName,
                    lastName:null,
                    question:req.body.companySecurityQuestion,
                    answer:req.body.companySecurityAnswer
                },function(err){
                    if(!err){
                        res.json({result:1});// sucess
                        console.log("insert succesfully.");
                    } else {
                        res.json({result:2});//fail
                        console.log("insert failed.");
                    }
                });
            }  
        });
    }
   

    
});

module.exports = router;
