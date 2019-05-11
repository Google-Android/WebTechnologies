/**
 * This middleware is used to deal with search jobs.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/* get jobResults page. */
router.get('/', function(req, res, next) {
    console.log('***jobResults***get***');
    res.render('jobResults',{user:req.session.user});

});


/* search jobs using parameters from the web page and the turn to result page. */
router.post('/', function(req, res, next) {
    console.log("***jobResults***post***");


});


module.exports = router;
