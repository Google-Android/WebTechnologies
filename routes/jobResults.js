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

    if(searchType == '1'){ // search in index page
        console.log('keyword:'+keyword+", location:"+location);
        jobData.searchJob(keyword,location,function (err, jobResults){
            if(err) throw err;

            if(!jobResults){// cannot find any jobs within the condition
                console.log('cannot find any jobs here.');
                res.json({result:0});
            } else {
                console.log('The number of search results:'+jobResults.length);
                console.log("user:"+req.session.user);
                res.render('jobResults',{user:req.session.user,"jobResults":jobResults,'keyword':req.query.keyword,'location':req.query.location});
                // res.json({result:1,"jobResults":jobResults});
            }
        });
    } else if(searchType == '2'){
        var salary = req.query.salary==null?"":req.query.salary;
        var industry = req.query.industry==null?"":req.query.industry;
        var jobType = req.query.jobType==null?"":req.query.jobType;

        var searchingRadio = req.query.searchingRadio==null?"":req.query.searchingRadio;

        var cityLat = req.session.latitude==null?"":req.session.latitude;
        var cityLng = req.session.longitude==null?"":req.session.longitude;


        console.log('keyword:'+keyword+", location:"+location+",salary:"+salary+",industry:"+industry+",jobType:"
            +jobType+',cityLat:'+cityLat+',cityLng:'+cityLng+',searchingRadio:'+searchingRadio);

        jobData.secondarySearchJob(keyword,location,cityLat,cityLng,searchingRadio,jobType,salary,industry,function(err,jobResults){
            if(err) {
                res.json({'result':0});
                throw err;
                console.log("err:"+err);
            }

            if(!jobResults){// cannot find any jobs within the condition
                console.log('cannot find any jobs here.');
                res.send({user:req.session.user,'result':2,'keyword':keyword,'location':location,'salary':salary,'industry':industry,"jobType":jobType});
            } else if(jobResults.length == 0){
                console.log('cannot find any jobs here.');
                res.send({user:req.session.user,'result':2,'keyword':keyword,'location':location,'salary':salary,'industry':industry,"jobType":jobType});
            } else {
                console.log('The number of search results:'+jobResults.length);
                console.log("user:"+req.session.user);
                res.send({user:req.session.user,'result':1,"jobResults":jobResults,'keyword':keyword,'location':location,'salary':salary,'industry':industry,"jobType":jobType});
            }
        });
    }
});


/* search jobs using parameters from the web page and return result to ajax. */
router.post('/', function(req, res, next) {
    console.log("***jobResults***post***");
    // console.dir('post query:'+req.query);


});


module.exports = router;
