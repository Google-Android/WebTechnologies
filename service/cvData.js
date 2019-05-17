/**
 * All encapsulated CRU methods related with job request.
 *
 * @type {{showWholeCv: cvData.showWholeCv, completeRequestInfo: cvData.completeRequestInfo, fillInBlankRequestInfo: cvData.fillInBlankRequestInfo, updateCv: cvData.updateCv, sendCv: cvData.sendCv, showCv: cvData.showCv, mainRequestInfo: cvData.mainRequestInfo, createCv: cvData.createCv}}
 * @last_modify_date     2019-05-17
 */
var cvData= {

    /**
     * This method is used to update CV containing achievement, education and work experience.
     *
     * @param cvId
     * @param accomplishment
     * @param edu
     * @param experience
     */
    updateCv: function(cvId,accomplishment,edu,experience){
        // require('../mongoDB/tools/dbUtil').dbConnection();    //Connect to the database.
        var CvModel = require('../mongoDB/models/cvs');       //Import the schema of the collection of cvs.

        //A person can only have one CV whose ID is unique. If users change their CVs, update them on  existing CVs.
        CvModel.findOne({_id:cvId},function(err,doc){
            if (err) throw err;
            else{
                doc.achievement=accomplishment;
                doc.education=edu;
                doc.workExperience=experience;
                doc.save();
            }
        });
    },



    /**
     * This method is used to insert CV containing achievement, education and work experience into database.
     *
     * @param accomplishment
     * @param edu
     * @param experience
     * @param callback
     */
    createCv: function(accomplishment,edu,experience,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();    //Connect to the database.
        var CvModel = require('../mongoDB/models/cvs');       //Import the schema of the collection of cvs.

        CvModel.create({
            achievement:accomplishment,
            education: edu,
            workExperience: experience
        },function (err, result) {
            if (err) throw err;
            callback(null, result);
        });
    },


    /**
     * When users send CVs to companies they are interested, insert user information, their CV information, job and company information into "cvconnjobs" collection
     * that is used to map users to jobs.
     * This method is prepared to implement a functionality that allows companies to see which users have applied for which jobs in their companies.
     *
     * @param id
     * @param company
     * @param jobName
     * @param jobId
     * @param userId
     * @param username
     * @param callback
     */
    sendCv: function(id,company,jobName,jobId,userId,username,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();       //Connect to the database.
        var CvModel = require('../mongoDB/models/cvConnJobs');   //Import the schema of the collection of cvConnJobs.

        CvModel.create({
            cvId: id,
            companyName:company,
            jobTitle:jobName,
            jobId:jobId,
            userId:userId,
            username:username
        },function(err,result){
            if (err) throw err;
            callback(null,result);
        });

    },




    /**
     * If users has created their CVs, every time when they send CVs to companies they are interested,
     * the application form will automatically show the CV information they have written before by calling this method.
     * Otherwise, the application form is blank.
     *
     * @param cvId
     * @param callback
     */
    showCv: function(cvId,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();       //Connect to the database.
        var CvModel = require('../mongoDB/models/cvs');          //Import the schema of the collection of cvs.

        //The cvID parameter of this function refers to the value of cv field of users collection.
        //In the users collection, if users don't create CV, the default value of cv field is "no".
        if(cvId!="no") {

            //cv collection stores the whole job request information including CV part.
            //Because this method only need CV information, the field information related to CV can be displayed with the projection method.
            CvModel.findOne({_id: cvId}, {achievement: 1, education: 1, workExperience: 1},
                function (err, result) {
                    if (err) throw err;
                    else {
                        callback(null, result);
                    }
            });
        }else{
            callback(null,null);
        }
    },


    /**
     * By cvId, get the whole job request information including CV, basic information.
     *
     * @param cvId
     * @param callback
     */
    showWholeCv: function(cvId,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();       //Connect to the database.
        var CvModel = require('../mongoDB/models/cvs');          //Import the schema of the collection of cvs.

        //The cvID parameter of this function refers to the value of cv field of users collection.
        //In the users collection, if users don't create CV, the default value of cv field is "no".
        if(cvId!="no") {
            CvModel.findOne({_id: cvId},
                function (err, result) {
                    if (err) throw err;
                    else {
                        callback(null, result);
                    }

                });
        }else{
            callback(null,null);
        }
    },




    /**
     * Update the job request information.
     * When users apply jobs, they send CV to company. When users request jobs, they create job request information which includes CV.
     * It means when users create job request, maybe they have already written CV as the part of job request before.
     * In this way, they only need to complete the blanks left of job request.
     * For database, we need to add other fields in the existing job request document of the collection. So, need to update collection.
     *
     * @param cvId
     * @param accomplishment
     * @param edu
     * @param experience
     * @param jobName
     * @param type
     * @param jobIndustry
     * @param sal
     * @param picUrl
     * @param adStreet
     * @param adCity
     * @param adState
     * @param zipcode
     * @param adCoun
     * @param date
     * @param callback
     */
    completeRequestInfo: function(cvId,accomplishment,edu,experience,jobName,type,jobIndustry,sal,picUrl,adStreet,adCity,adState,zipcode,adCoun,date,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();       //Connect to the database.
        var RequestModel = require('../mongoDB/models/cvs');     //Import the schema of the collection of cvs.

        RequestModel.findOne({_id:cvId},function(err,doc){
            if (err) throw err;
            else{
                doc.achievement=accomplishment,
                doc.education=edu,
                doc.workExperience=experience,
                doc.title=jobName,
                doc.jobType=type,
                doc.industry=jobIndustry,
                doc.salary=sal,
                doc.profileUrl="../image/"+picUrl,                    //User can upload picture. database stores the path of the picture.
                doc.street=adStreet,
                doc.city=adCity,
                doc.state=adState,
                doc.postcode=zipcode,
                doc.country=adCoun,
                doc.postDate=date,
                doc.save();
                callback(null, doc);
            }
        })
    },




    /**
     * Create the job request information.
     * When users apply jobs, they send CV to company. When users request jobs, they create job request information which includes CV.
     * completeRequestInfo() method is aimed at this situation that when users create job request, maybe they has already written CV which is part of job request before.
     * This fillInBlankRequestInfo() method is aimed at this situation that when users create job request, they haven't written CV before.
     * For database, we need to create a new document of the collection.
     *
     * @param accomplishment
     * @param edu
     * @param experience
     * @param jobName
     * @param type
     * @param jobIndustry
     * @param sal
     * @param picUrl
     * @param adStreet
     * @param adCity
     * @param adState
     * @param zipcode
     * @param adCoun
     * @param date
     * @param callback
     */
    fillInBlankRequestInfo: function(accomplishment,edu,experience,jobName,type,jobIndustry,sal,picUrl,adStreet,adCity,adState,zipcode,adCoun,date,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();       //Connect to the database.
        var RequestModel = require('../mongoDB/models/cvs');     //Import the schema of the collection of cvs.

        RequestModel.create({
            achievement: accomplishment,
            education: edu,
            workExperience: experience,
            title: jobName,
            jobType: type,
            industry: jobIndustry,
            salary: sal,
            profileUrl: "../image/"+picUrl,                           //User can upload picture. database stores the path of the picture.
            street: adStreet,
            city: adCity,
            state: adState,
            postcode: zipcode,
            country: adCoun,
            postDate: date,
        },function(err,doc){
            if (err) throw err;
            callback(null, doc);
        });
    },


    /**
     * By calling fillInBlankRequestInfo() and completeRequestInfo(), this method is used for user to fill in or change job request form.
     * When users apply jobs, they send CV to company. When users request jobs, they create job request information which includes CV.
     * It means when users create job request, maybe they have already written CV as the part of job request before or not.
     * Can call this method to create job request whether users wrote CV before or not.
     *
     * @param cvId
     * @param accomplishment
     * @param edu
     * @param experience
     * @param jobName
     * @param type
     * @param jobIndustry
     * @param sal
     * @param picUrl
     * @param adStreet
     * @param adCity
     * @param adState
     * @param zipcode
     * @param adCoun
     * @param date
     * @param callback
     */
    mainRequestInfo: function(cvId,accomplishment,edu,experience,jobName,type,jobIndustry,sal,picUrl,adStreet,adCity,adState,zipcode,adCoun,date,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();       //Connect to the database.
        var tempCvData =require('./cvData');                     //Import two other methods of the current js file.

        //The cvID parameter of this function refers to the value of cv field of users collection.
        //In the users collection, if users don't create CV, the default value of cv field is "no".
        //Therefore, call fillInBlankRequestInfo() to create the whole job request information.
        if(cvId=="no"){
            tempCvData.fillInBlankRequestInfo(accomplishment, edu, experience, jobName, type, jobIndustry, sal, picUrl, adStreet, adCity, adState, zipcode, adCoun, date,
                function(err,doc){
                callback(null, doc);
            });

        //If users has wrote a part of job request, such as CV, call completeRequestInfo() to complete the blanks left of job request.
        } else {
            tempCvData.completeRequestInfo(cvId, accomplishment, edu, experience, jobName, type, jobIndustry, sal, picUrl, adStreet, adCity, adState, zipcode, adCoun, date,
                function(err,doc){
                if (err) throw err;
                callback(null, doc);
            });
        }
    }

}

module.exports=cvData;   //Export this module





// cvData.mainRequestInfo("5cda77d7a8a1062f541bd4ff","Sisley","w","e","r","t","y",22,
//     "i","o","p","a","s","d","ee",
//     function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
//
//     });

// cvData.showCv("no",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// })
//
// cvData.sendCv("5cd9a96e7607bc2578d74ddd","Baidu","Graduate Software Developer","5cd9bf1ea185a613354d7bdb",function(err,doc){
//    // if(!err){
//         console.log('1111111');
//         console.log(doc);
//         //console.log('22222');
//    // }
// })

// cvData.createCv("s","s","d",function(err,doc){
//     console.log(doc);
// })
// require('../mongoDB/tools/connection');
// var User = require('./models/user');
// // var tempCv= require("../service/cvData");
// User.findOne({email:"yiping73@sheffiled.ac.uk"},function (err, doc) {
//     if (!err) {
//         console.log(doc);
//     }
// });

// require('../mongoDB/tools/connection');
// var JobModel = require('../mongoDB/models/cvs');
//
// JobModel.updateMany({}, {$set: {latitude: 12.88}},function(err,doc){
//
// });