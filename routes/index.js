/**
 * This middleware is used to show index page with user information.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();


/**
 * get the index page or clear session when logout
 * @param operation: logout or others
 * @return user
 */
router.get('/', function(req, res) {
    console.log('***index***get***');

    var operation = req.query.operation==null?"":req.query.operation;
    console.log('operation:'+operation);

    if(operation == "logout"){
        //when processing logout, the session will be destroyed.
        req.session.destroy(function (err) {
            if(err){
                console.log('err:'+err);
            }
            res.redirect('/');
        });
    } else {
        //if user has been stored in session, the username will be shown on web page.
        if(req.session.user){
            res.render('index',{'user':req.session.user});
        } else{
            res.render('index',{'user':null});
        }
    }

});


/**
 * get the url with parameters when searching for jobs and return it to ajax.
 * @param searchType: 1 or 2
 * @param keyword
 * @param location
 * @param cityLat
 * @param cityLng
 * @return url
 */
router.post('/', function(req, res) {
    console.log('***index***post***');

    var searchType = req.body.searchType==null?"":req.body.searchType;
    var keyword = req.body.keyword==null?"":req.body.keyword;
    var location = req.body.location==null?"":req.body.location;
    var cityLat = req.body.cityLat==null?"":req.body.cityLat;
    var cityLng = req.body.cityLng==null?"":req.body.cityLng;

    console.log(searchType+","+keyword+","+location+','+cityLat+','+cityLng);

    req.session.latitude=cityLat;
    req.session.longitude=cityLng;

    var url = "/jobResults?searchType="+searchType+"&keyword="+keyword+"&location="+location;

    res.json({'url':url});
});

module.exports = router;
