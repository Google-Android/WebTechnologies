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

    var searchType = req.query.searchType;
    var keyword = req.query.keyword==null?"":req.query.keyword;
    var location = req.query.location==null?"":req.query.location;
    if(location!=null){
        location=location.replace(/ /g,'');
    }

    // search jobs in database
    console.log('keyword:'+keyword+", location:"+location);

    if(searchType == '1'){ // search in index page
        jobData.searchJob(keyword,location,function (err, jobResults){
            if(err) throw err;

            if(!jobResults){// cannot find any jobs within the condition
                console.log('cannot find any jobs here.');
                res.json({result:0});
            } else {
                console.log('The number of search results:'+jobResults.length);
                console.log('get results of job done.');
                console.log("user:"+req.session.user);
                res.render('jobResults',{user:req.session.user,"jobResults":jobResults,'keyword':req.query.keyword,'location':req.query.location});
                // res.json({result:1,"jobResults":jobResults});
            }
        });
    } else if(searchType == '2'){
        var salary = req.query.salary;
        var industry = req.query.industry;
        var jobType = req.query.jobType;




    }


    // res.render('jobResults',{user:req.session.user,'keyword':req.query.keyword,'location':req.query.location});
});


/* search jobs using parameters from the web page and return result to ajax. */
router.post('/', function(req, res, next) {
    console.log("***jobResults***post***");
    // console.dir('post query:'+req.query);


});


module.exports = router;
