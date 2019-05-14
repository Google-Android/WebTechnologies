


var jobData= {

    searchJob: function (condition, condition2, callback) {
        var tool = require('../mongoDB/tools/dbUtil');
        var JobModel = require('../mongoDB/models/jobs');
        tool.dbConnection();
        tool.dealWithMultiStrings(condition, function (err, result) {
            if (!err) {
                JobModel.find({
                        $and: [
                            {
                                $or: [{title: result},
                                      {companyName: result},
                                      {jobType: result}]
                            },
                            {
                                $or: [{city: {$regex: condition2, $options: 'i'}},
                                    {postcode: {$regex: condition2, $options: 'i'}}]
                            }
                        ]
                    },
                    function (err, doc) {
                        if (err) throw err;
                        callback(null, doc);
                }).sort({postDate: -1, title: 1});
            }
        });
    },


    secondarySearchJob: function(keyword, location, jType, sal, jobIndustry,callback) {
        var JobModel = require('../mongoDB/models/jobs');
        var tool = require('../mongoDB/tools/dbUtil');
        tool.dbConnection();

        if(jobIndustry=="undefined"){
            jobIndustry="";
        }
        if(jType=="undefined"){
            jType="";
        }
        if(sal=="undefined"){
            sal="0";            //   -1000
        }

        tool.dealWithMultiStrings(keyword, function (err, result) {
            if (!err) {
                if ((sal == "4") || (sal == "0")) {
                    JobModel.find({
                        $and: [
                            {
                                $or: [{title: result},
                                    {companyName: result},
                                    {jobType: result}]
                            },
                            {
                                $or: [{city: {$regex: location, $options: 'i'}},
                                      {postcode: {$regex: location, $options: 'i'}}]
                            },
                            {
                                jobType: {$regex: jType, $options: 'i'}
                            },
                            {
                                salary: {$gte: (sal - 1) * 1000}
                            },
                            {
                                industry: {$regex: jobIndustry, $options: 'i'}
                            }
                        ]
                    }, function (err, result) {
                        if (err) throw err;
                        callback(null, result);
                    }).sort({postDate: -1, title: 1});


                } else {
                    JobModel.find({
                            $and: [
                                {
                                    $or: [{title: result},
                                        {companyName: result},
                                        {jobType: result}]
                                },
                                {
                                    $or: [{city: {$regex: location, $options: 'i'}},
                                        {postcode: {$regex: location, $options: 'i'}}]
                                }, {
                                    jobType: {$regex: jType, $options: 'i'}
                                }, {
                                    salary: {$gte: (sal - 1) * 1000, $lte: sal * 1000}
                                }, {
                                    industry: {$regex: jobIndustry, $options: 'i'}
                                }
                            ]
                        },

                        function (err, result) {
                            if (err) throw err;
                            callback(null, result);
                        }).sort({postDate: -1, title: 1});
                }
            }
            });
    },




    showJobDetails: function(id, callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();
        var JobModel = require('../mongoDB/models/jobs');
        JobModel.find({_id: id},
            function (err, result) {
                if (err) throw err;
                callback(null, result);
        });

    },




    postJob: function(jobName,company,email,jobIndustry,type,sal,picUrl,details,date,adStreet,adCity,adState,zipcode,adCoun,callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();
        var JobModel = require('../mongoDB/models/jobs');
        JobModel.create({
                title: jobName,
                companyName: company,
                companyEmail: email,
                industry: jobIndustry,
                jobType: type,
                city: adCity,
                postcode: zipcode,
                salary: sal,
                picture: "../image/" + picUrl,
                description: details,
                postDate: date,
                street: adStreet,
                state: adState,
                country: adCoun
            },
            function (err, result) {
                if (err) throw err;
                callback(null, result);
        });
    },


    deleteJob: function(jobId,callback){
        require('../mongoDB/tools/dbUtil').dbConnection();
        var JobModel = require('../mongoDB/models/jobs');
        JobModel.findOne({_id:jobId},function(err,doc){
            if (err) throw err;
            else{
                doc.inUse="0";
                doc.save();
                callback(null, doc);
            }
        });
    },

    dealWithString: function(str) {
        if (str == "undefined") {
            str = "";
        }
        return str;
    }


};

module.exports=jobData;  // export this module




// jobData.deleteJob("5cd6c3fe161fea127cc1c625",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// });


// jobData.postJob("dd","d","f",'e',"22",333,"s.jpg","London","11.jpg",
//     "f","12-01","d","d","d",function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
//     })

// jobData.showJobDetails("urban outfitters",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// })

// var a="amazon";
// var b="s1";
//
//
// var keyArr=a.split(" ");
//
// var key_query="";
// console.log(keyArr);
// for(var i=0;i<keyArr.length;i++){
//     key_query=key_query+keyArr[i]+"|";
// }
// //
//  console.log(key_query);
// key_query=key_query.substring(0,key_query.length-1);
// //
// console.log(key_query);
// let condition=new RegExp(key_query);
// //
// console.log(condition);
//console.log(role_query);
//keyword, location, jType, sal1,sal2, callback

// jobData.searchJob("amazon full-time","",function(err,docs){
//     if(!err){
//         console.log(docs.length);
//     }
// });



// var a="amazon";
// var b="s1";
//
// jobData.secondarySearchJob("amazon","","undefined","undefined","undefined",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// });
// jobData.secondarySearchJob(a,"","",0,null,"nanny",function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
// });



//加经纬度
// require('../mongoDB/tools/connection');
// var JobModel = require('../mongoDB/models/jobs');
//
// JobModel.updateMany({}, {$set: {inUse: "1"}},function(err,doc){
//
//
// });

