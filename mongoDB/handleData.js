// require('./tools/connection');                //connect to database;
 //User Schema used to define the document field type


var handleData= {

    searchUser: function (condition, callback) {
        require('./tools/connection');
        var User = require('./models/user');
        //it will be called for register and login
        User.findOne(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },

    //it will be called for register
    insertUser: function (condition, callback) {
        require('./tools/connection');
        var User = require('./models/user');
        User.create(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },

    addCvIntoUser: function (userId, accomplishment, edu, experience, callback) {
        var userData = require('./handleData');
        var tempCv = require("../service/cvData");
        userData.searchUser({_id: userId}, function (err, doc) {
            if (err) throw err;
            else {
                if (doc.cv === "no") {

                    //新增cv
                    tempCv.createCv(accomplishment, edu, experience, function (error, result) {
                            doc.cv = result._id;
                            doc.save();
                        }
                    );
                } else {

                    tempCv.updateCv(doc.cv, accomplishment, edu, experience);

                }
                callback(null, doc);

            }
        })
    }




}


module.exports=handleData;
// export this module





handleData.addCvIntoUser("5cd5572dc4cca61a76737198","asd","sdd","sss",function(err,doc){
    if(!err){
        console.log(doc);
    }
});
// var tempCv= require("../service/cvData");
// //tempCv.createCv();
// handleData.searchUser({_id:"5cd82dbe3a49da328c62a7c5"},function(err,doc){
//     console.log(doc);
//     if(doc.cv=="no"){
//         console.log("sss");
//         tempCv.createCv("k", "j", "gg", function (error, result) {
//             console.log(result);
//             console.log(result._id);
//             doc.cv = result._id;
//             doc.save();
//             console.log(doc.cv);
//         });
//
//
//
//     }else {
//         tempCv.updateCv(doc.cv,"d","qwe","qweeee");
//         console.log("sssss");
//     }
// });




