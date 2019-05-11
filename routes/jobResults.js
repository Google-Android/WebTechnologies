/**
 * This middleware is used to deal with search jobs.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var handleData = require('../mongoDB/handleData');


/* get jobResults page with results. */
router.get('/', function(req, res, next) {
    console.log('***jobResults***get***');
    res.render('jobResults',{user:req.session.user,'keyword':req.query.keyword,'location':req.query.location});
});


/* search jobs using parameters from the web page and return result to ajax. */
router.post('/', function(req, res, next) {
    console.log("***jobResults***post***");
    // console.dir('post query:'+req.query);

    var keyword = req.body.keyword;
    var location = req.body.location;

    // search in db...........
    var condition = keyword;
    console.log('keyword:'+keyword+", location:"+location);
    console.log('job search condition:'+condition);

    handleData.searchJob(condition,function (err, jobResults) {
        if(err) throw err;

        if(!jobResults){// cannot find any jobs within the condition
            console.log('cannot find any jobs here.');
            res.json({result:0});
        } else {
            console.log('The number of search results:'+jobResults.length);
            console.log('get results of job done.');
            res.render('jobResults',{user:req.session.user,"jobResults":jobResults});
            // res.json({result:1,"jobResults":jobResults});
        }
    })
});


module.exports = router;
