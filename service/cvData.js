
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



    sendCv: function(id,company,job,callback){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvConnJobs');
        CvModel.create({
                cvId: id,
                companyName:company,
                jobTitle: job
            },
            function(err,result){
                if (err) throw err;
                callback(null, result);

        });
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
        tempCvData.showCv(cvId,function(err,result){
            if (err) throw err;
            else {
                //result 是空

                if (!result) {
                    tempCvData.fillInBlankRequestInfo(accomplishment, edu, experience, jobName, type, jobIndustry, sal, picUrl, adStreet, adCity, adState, zipcode, adCoun, date,
                        function(err,doc){
                            if (err) throw err;
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

        });

    }


}

module.exports=cvData;

// cvData.mainRequestInfo("no","q","w","e","r","t","y",22,
//     "i","o","p","a","s","d","ee",
//     function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
//
//     });

cvData.showCv("no",function(err,doc){
    if(!err){
        console.log(doc);
    }
})

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