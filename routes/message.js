var express = require('express');
var router = express.Router();
var companyNotificationData = require('../service/companyNotificationData');

/*  */
router.get('/', function(req, res, next) {
    console.log('***message***get***');

    var companyUserName = req.session.user.name;

    // find the name of job seeker, job title, job id, cv id from database according to the companyUserId;
    companyNotificationData.showUserJobCv(companyUserName,function(err,messages){
        if(err){
            console.log('err:'+err);
            throw err;
        }
        if(messages){
            console.log('messages:\n'+messages);
            res.render('message',{user:req.session.user,'messages':messages});
        }
    });
});

/* */
router.post('/', function(req, res, next) {
    console.log("***message***post***");

});

module.exports = router;
