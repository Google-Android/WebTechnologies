
var cvData= {
    //require('../mongoDB/models/user');
    updateCv: function(cvId,accomplishment,edu,experience){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');

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

    createCv: function(accomplishment,edu,experience,callback){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');

        CvModel.create({
            achievement:accomplishment,
            education: edu,
            workExperience: experience

        },
            function (err, result) {
                if (err) throw err;
                callback(null, result);
            });
    },




    sendCv: function(id,company,jobName,jobId,userId,username,callback){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvConnJobs');
        // var User = require('../mongoDB/models/user');
        var userData = require('../mongoDB/handleData');
        var jobData = require('./jobData');
        // var Job = require('../mongoDB/models/jobs');

        CvModel.create({
            cvId: id,
            companyName:company,
            jobTitle:jobName,
            jobId:jobId,
            userId:userId,
            username:username
        },function(err,result){
            if (err) throw err;
            // userData.searchUser({cv:id},function(err,doc){
            //     console.log(doc);
            //         result.username=doc.name+" "+doc.lastName;
            //     console.log(doc.name);
            //     console.log(result.username);
            //         result.userId=doc._id;
            //     console.log(result.userId);
            //         result.save();
            //         console.log(result);
            //     });

            // jobData.searchSingleJob({companyName:company,title:jobName},function(err,doc){
            //
            //         result.jobId=doc._id;
            //
            //
            // });
            //result.save();
            callback(null,result);

        });


        // userData.searchUser({cv:id},function(err,doc){
        //         CvModel.findOne({cvId:id,companyName:company,jobTitle:jobName},function(err,result){
        //             result.username=doc.name+" "+doc.lastName;
        //             result.userId=doc._id;
        //             result.save();
        //         });
        //
        //     //console.log(name);
        // });
        //
        // jobData.searchSingleJob({companyName:company,title:jobName},function(err,doc){
        //     CvModel.findOne({cvId:id},function(err,result){
        //         result.jobId=doc._id;
        //         result.save();
        //         callback(null,result);
        //     });
        //
        // });

        // var user=function(id) {
        //     return User.findOne({
        //         cv: id
        //     });
        // }
        // console.log(user);

        // var job=function(jobName,company){
        //     Job.findOne({title:jobName,companyName:company},function(err,doc){
        //         return doc
        //         }
        //         )};
        // console.log(job);

        //
        // CvModel.create({
        //         cvId: id,
        //         companyName:company,
        //         jobTitle:jobName
        //
        //
        //
        // },function(err,doc){
        //     doc.username=user;
        //     console.log(user);
        //     // doc.userId=user._id;
        //     // doc.jobId=job._id;
        //     doc.save();
        //     //
        //     // if (err) throw err;
        //     // else{
        //     //     // doc.username=user.name+" "+user.lastName;
        //     //     // doc.userId=user._id;
            //     // doc.jobId=job._id;
            //     // doc.save();
            //     callback(null, doc);
            // }
        // });
        //
        //
        //
        // CvModel.findOne({cvId:id},function(err,doc){
        //     doc.username=name;
        //     // doc.userId=user._id;
        //     // doc.jobId=job._id;
        //     doc.save();
        //         //
        //         // if (err) throw err;
        //         // else{
        //         //     // doc.username=user.name+" "+user.lastName;
        //         //     // doc.userId=user._id;
        //         //     // doc.jobId=job._id;
        //         //     // doc.save();
        //         //     callback(null, doc);
        //         // }
        // });




    },


    // 用投影了！！！！！！！！！！！  如果可以查到结果，就显示在页面上，查不到就不显示
    //cvId 的值，就是user.cv 的值，即使这个字段是默认值"no"，也直接传进来

    showCv: function(cvId,callback){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');
        if(cvId!="no") {
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

    showWholeCv: function(cvId,callback){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');
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

    // 已经有cv信息了
    completeRequestInfo: function(cvId,accomplishment,edu,experience,jobName,type,jobIndustry,sal,picUrl,adStreet,adCity,adState,zipcode,adCoun,date,callback){
        require('../mongoDB/tools/connection');
        var RequestModel = require('../mongoDB/models/cvs');
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
                doc.profileUrl="../image/"+picUrl,
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




    fillInBlankRequestInfo: function(accomplishment,edu,experience,jobName,type,jobIndustry,sal,picUrl,adStreet,adCity,adState,zipcode,adCoun,date,callback){
        require('../mongoDB/tools/connection');
        var RequestModel = require('../mongoDB/models/cvs');

        RequestModel.create({
            achievement: accomplishment,
            education: edu,
            workExperience: experience,
            title: jobName,
            jobType: type,
            industry: jobIndustry,
            salary: sal,
            profileUrl: "../image/"+picUrl,
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



    // 总的方法！
    mainRequestInfo: function(cvId,accomplishment,edu,experience,jobName,type,jobIndustry,sal,picUrl,adStreet,adCity,adState,zipcode,adCoun,date,callback){
        require('../mongoDB/tools/connection');
        var tempCvData =require('./cvData');
        // tempCvData.showCv(cvId,function(err,result){
        //     if (err) throw err;
        //     else {
        //         //result 是空

                // if (!result) {
        if(cvId=="no"){
            tempCvData.fillInBlankRequestInfo(accomplishment, edu, experience, jobName, type, jobIndustry, sal, picUrl, adStreet, adCity, adState, zipcode, adCoun, date,
                function(err,doc){
                // if (err) throw err;
                 callback(null, doc);
            });
         } else {
            tempCvData.completeRequestInfo(cvId, accomplishment, edu, experience, jobName, type, jobIndustry, sal, picUrl, adStreet, adCity, adState, zipcode, adCoun, date,
                function(err,doc){
                if (err) throw err;
                callback(null, doc);
            });
        }
    }

}

module.exports=cvData;

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