/**
 * This middleware is used to deal with search jobs.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();
var jobData = require('../service/jobData');


/* get jobResults page with results. */
router.get('/', function(req, res, next) {
    console.log('***jobResults***get***');
    res.render('jobResults',{user:req.session.user,'keyword':req.query.keyword,'location':req.query.location});
});


/* search jobs using parameters from the web page and return result to ajax. */
router.post('/', function(req, res, next) {
    console.log("***jobResults***post***");
    // console.dir('post query:'+req.query);

    var keyword = req.body.keyword==null?"":req.body.keyword;
    var location = req.body.location==null?"":req.body.location;
    if(location!=null){
        location=location.replace(/ /g,'');
    }

    // search jobs in database
    console.log('keyword:'+keyword+", location:"+location);

    jobData.searchJob(keyword,location,function (err, jobResults){
        if(err) throw err;

        if(!jobResults){// cannot find any jobs within the condition
            console.log('cannot find any jobs here.');
            res.json({result:0});
        } else {
            console.log('The number of search results:'+jobResults.length);
            console.log('get results of job done.');
            console.log("user:"+req.session.user);
            res.render('jobResults',{user:req.session.user,"jobResults":jobResults});
            // res.json({result:1,"jobResults":jobResults});
        }
    })
});


module.exports = router;
