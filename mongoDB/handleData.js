// require('./tools/connection');                //connect to database;
 //User Schema used to define the document field type


var handleData={

    searchUser:function(condition,callback) {
        require('./tools/connection');
        var User = require('./models/user');
        //it will be called for register and login
        User.findOne(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },

    //it will be called for register
    insertUser:function(condition,callback) {
        require('./tools/connection');
        var User = require('./models/user');
        User.create(condition,function(err,result){
            if (err) throw err;
            callback(null, result);
        });
    },

    findCV: function(condition,callback) {
        require('./tools/connection');
        var Cv = require('./models/uploadCV');
        Cv.findOne(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },

    insertCV: function(condition,callback) {
        require('./tools/connection');
        var CvModel = require('./models/uploadCV');
        CvModel.create(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },
    removeCV: function(condition,callback) {
        require('./tools/connection');
        var CvModel= require('./models/uploadCV');
        CvModel.remove(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },
    searchJob: function(condition,callback){
        require('./tools/connection');
        var JobModel= require('./models/job');
        JobModel.find({$or:[{title: condition }, {companyName: condition },{jobType: condition}] }, function(err,result){
            if (err) throw err;
            callback(null, result);
        });
    }
}

module.exports=handleData;   // export this module