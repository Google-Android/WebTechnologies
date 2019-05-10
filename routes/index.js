// require('../mongoDB/tools/connection');//connect to database;
// require("../tools/connection");   
var express = require('express');
var router = express.Router();
// var User = require('../mongoDB/models/user'); //user Schema used to define the document field type



/* GET home page. */
router.get('/', function(req, res) {
  console.log('***index***get***')
  if(req.session.user){
    res.render('index',{user:req.session.user});
  } else{
    res.render('index',{user:null});
  }

});


module.exports = router;
