/**
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/*  */
router.get('/', function(req, res) {
  console.log('***requestDetails***get***');
    res.render('requestDetails',{user:req.session.user});
});

router.post('/', function(req, res) {
    console.log('***requestDetails***post***');
    res.render('requestDetails',{user:req.session.user});
});


module.exports = router;
