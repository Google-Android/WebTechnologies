/**
 * this middleware is used for message page.
 * the company could receive messages that who has applied to their jobs.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var companyNotificationData = require('../service/companyNotificationData');


/**
 * get the information of all users who have applied to their jobs.
 * @param companyUserName
 * @return messages
 */
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


module.exports = router;
