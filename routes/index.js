/**
 * This middleware is used to show index page with user information.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/* GET index page. */
router.get('/', function(req, res) {
    console.log('***index***get***');
    var operation = req.query.operation==null?"":req.query.operation;
    if(operation == ""){
        //if user has been stored in session, the username will be shown on web page.
        if(req.session.user){
            res.render('index',{user:req.session.user});
        } else{
            res.render('index',{user:null});
        }
    } else if(operation == "logout"){
        //when processing logout, the session will be destroyed.
        req.session.destroy(function (err) {
            if(err){
                console.log('err:'+err);
            }
            res.redirect('/');
        })
    }
});


router.post('/', function(req, res) {
    console.log('***index***post***');
    var searchType = req.body.searchType==null?"":req.body.searchType;
    var keyword = req.body.keyword==null?"":req.body.keyword;
    var location = req.body.location==null?"":req.body.location;

    var cityLat = req.body.cityLat==null?"":req.body.cityLat;
    var cityLng = req.body.cityLng==null?"":req.body.cityLng;

    req.session.latitude=cityLat;
    req.session.longitude=cityLng;

    console.log('searchType:'+searchType+",keyword:"+keyword+",location:"+location+',cityLat:'+cityLat+',cityLng:'+cityLng);

    var url = "/jobResults?searchType="+searchType+"&keyword="+keyword+"&location="+location;
    res.json({'url':url});
});

module.exports = router;
