var express = require('express');
var router = express.Router();


/* GET home page after login. */
router.get('/', function(req, res, next) {
    console.log('***login***get***');
    res.render('message',{user:req.session.user});

});

// validation of the login email and password
router.post('/', function(req, res, next) {
    console.log("***login***post***");

});

module.exports = router;
