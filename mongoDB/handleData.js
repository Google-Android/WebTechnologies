/**
 * CRUD methods related with user information.
 *
 * @type {{addCvIntoUser: handleData.addCvIntoUser, insertUser: handleData.insertUser, searchUser: handleData.searchUser, changePassword: handleData.changePassword}}
 * @last_modify_date     2019-05-17
 *
 */
 var handleData= {

    /**
     * it will be called for register and login
     * @param condition
     * @param callback
     */
    searchUser: function(condition, callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();
        var User = require('./models/user');
        User.find(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });

    },


    /**
     * It will be called for register
     * @param condition
     * @param callback
     */
    insertUser: function (condition, callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();
        var User = require('./models/user');
        User.create(condition, function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },


    /**
     * The method is used to change password.
     * @param userEmail
     * @param newPwd
     * @param callback
     */
    changePassword: function(userEmail,newPwd,callback){
        require('../mongoDB/tools/dbUtil').dbConnection();
        var User = require('./models/user');
        User.findOne({email:userEmail},function(err,doc){

            if (err) throw err;
            else {
                doc.pwd = newPwd;
                doc.save();
                callback(null,doc);
            }
        });
    },


    /**
     * This method is used to add the value of cv field of users collection.
     *
     * @param userId
     * @param accomplishment
     * @param edu
     * @param experience
     * @param callback
     */
    addCvIntoUser: function (userId, accomplishment, edu, experience, callback) {
        var userData = require('./handleData');
        var tempCv = require("../service/cvData");
        userData.searchUser({_id: userId}, function (err, doc) {
            if (err) throw err;
            else {

                //When user register sthe account, the default value of cv ID is "no".
                //If the value of cv ID is "no", create a new CV.
                if (doc.cv === "no") {

                    tempCv.createCv(accomplishment, edu, experience, function (error, result) {
                            doc.cv = result._id;
                            doc.save();
                        }
                    );

                //If users have already created CV, now update CV when calling this method.
                } else {

                    tempCv.updateCv(doc.cv, accomplishment, edu, experience);

                }
                callback(null, doc);

            }
        })
    }

}


module.exports=handleData;     // Export this module


// handleData.changePassword("baidu@baidu.com","qqq",function(err,doc){
//     if(!err)
//     console.log(doc);
// });

handleData.searchUser({email:"yzhao73@sheffield.ac.uk"},function(err,doc){
    console.log("sss");
    if(!doc) {
        console.log(doc);
    }else{
        console.log("www");
    }
});

handleData.insertUser({email:"ss",pwd:"sss",personOrComp:"p"},function(){

});

// handleData.addCvIntoUser("5cd5572dc4cca61a76737198","123321","sdd","sss",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// });

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




