// require('./tools/connection');                //connect to database;
 //User Schema used to define the document field type


var handledata={

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
    }

}

module.exports=handledata;   // export this module