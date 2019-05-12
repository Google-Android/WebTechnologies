/**
 *
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/*  */
router.get('/', function(req, res) {
  console.log('***findCvs***get***');
  res.render('findCvs',{user:req.session.user});
});

router.post('/', function(req, res) {
    console.log('***findCvs***post***');
    res.render('findCvs',{user:req.session.user});
});


module.exports = router;
