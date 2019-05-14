
var jobData= {




    secondarySearchJob: function(keyword, location, jType, sal, jobIndustry,callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/jobs');
        if(jobIndustry=="undefined"){
            jobIndustry="";
        }
        if(jType=="undefined"){
            jType="";
        }
        if(sal=="undefined"){
            sal="0";            //   -1000
        }

        if((sal=="4")||(sal=="0")){
            JobModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: keyword, $options: 'i'}},
                            {companyName: {$regex: keyword,$options: 'i'}},
                            {jobType: {$regex: keyword, $options: 'i'}}]
                    },
                    {
                        $or: [{city: {$regex: location, $options: 'i'}}, {postcode: {$regex: location, $options: 'i'}}]
                    }, {
                        jobType: {$regex: jType, $options: 'i'}
                    }, {
                        salary: {$gte: (sal-1)*1000}
                    },{
                        industry: {$regex:jobIndustry, $options: 'i'}
                    }
                ]},function (err, result) {
                if (err) throw err;
                callback(null, result);
            }).sort({postDate:-1,title:1});


        }else {
            JobModel.find({
                    $and: [
                        {
                            $or: [{title: {$regex: keyword, $options: 'i'}}, {
                                companyName: {
                                    $regex: keyword,
                                    $options: 'i'
                                }
                            }]
                        },
                        {
                            $or: [{city: {$regex: location, $options: 'i'}}, {
                                postcode: {
                                    $regex: location,
                                    $options: 'i'
                                }
                            }]
                        }, {
                            jobType: {$regex: jType, $options: 'i'}
                        },{
                            salary: {$gte: (sal-1)*1000, $lte: sal*1000}
                        },{
                            industry: {$regex:jobIndustry, $options: 'i'}
                        }
                    ]
                },

                function (err, result) {
                    if (err) throw err;
                    callback(null, result);
                }).sort({postDate:-1,title:1});
        }

    },

    showJobDetails: function (id, callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/jobs');
        JobModel.find({_id: id},
            function (err, result) {
                if (err) throw err;
                callback(null, result);
            });

    },

    postJob: function(jobName,company,email,jobIndustry,type,sal,picUrl,details,date,adStreet,adCity,adState,zipcode,adCoun,callback){
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/jobs');
        JobModel.create({
            title: jobName,
            companyName: company,
            companyEmail:email,
            industry: jobIndustry,
            jobType: type,
            city: adCity,
            postcode: zipcode,
            salary: sal,
            picture: "../image/"+picUrl,
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


        searchJob: function (newCondition, condition2, callback) {
            require('../mongoDB/tools/connection');
            //var tool=require('../mongoDB/tools/utility');
            var JobModel = require('../mongoDB/models/jobs');
            //     tool.dealWithMultiStrings(condition,function(err,newCondition){
            //        if(!err){


            // var newCondition;
            // var keyArr=condition.split(" ");
            // if(keyArr.length!=1) {
            //     var key_query = "";
            //     for (var i = 0; i < keyArr.length; i++) {
            //         key_query = key_query + keyArr + "|";
            //     }
            // key_query = key_query.substring(key_query.length);
            //
            // newCondition = new RegExp(key_query);
            // }else{newCondition=condition}

            JobModel.find({
                    $and: [
                        {
                            $or: [{title: {$regex: newCondition, $options: 'i'}},
                                {companyName: {$regex: newCondition, $options: 'i'}},
                                {jobType: {$regex: newCondition, $options: 'i'}}]
                        },
                        {
                            $or: [{city: {$regex: condition2, $options: 'i'}}, {postcode: {$regex: condition2, $options: 'i'}}]
                        }
                    ]
                },

                function (err, result) {
                    if (err) throw err;
                    callback(null, result);
                }).sort({postDate:-1,title:1});

        }
        //    });



};

module.exports=jobData;   // export this module





// jobData.postJob("dd","d","f",'e',"22",333,"London","11.jpg",
//     "f","12-01",function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
//     })

// jobData.showJobDetails("urban outfitters",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// })

// var a="amazon part-time";
// var b="s1";
//
//
// var keyArr=a.split(" ");
//
// var key_query="";
// for(var i=0;i<keyArr.length;i++){
//     key_query=key_query+keyArr+"|";
// }
// key_query=key_query.substring(key_query.length);
//
// let condition=new RegExp(key_query);
//
// //console.log(role_query);
// //keyword, location, jType, sal1,sal2, callback
// jobData.searchJob(condition,b,function(err,docs){
//     if(!err){
//         console.log(docs);
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



// 加经纬度
// require('../mongoDB/tools/connection');
// var JobModel = require('../mongoDB/models/jobs');
//
// JobModel.updateMany({}, {$set: {longitude: -12.88}},function(err,doc){
//
// });

