require("../tools/connection");   //connect to database;
var express = require('express');
var router = express.Router();
var User=require("../models/user");       //user Schema used to define the document field type



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
