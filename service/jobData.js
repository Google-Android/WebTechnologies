
var jobData= {
    searchJob: function (condition, condition2, callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/job');
        JobModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: condition, $options: 'i'}},
                              {companyName: {$regex: condition, $options: 'i'}},
                              {jobType: {$regex: condition, $options: 'i'}}]
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

    },

    // job: function (condition, condition2, callback) {
    //     require('../mongoDB/tools/connection');
    //     var JobModel = require('../mongoDB/models/job');
    //
    //     for(int i=0;i<condition.length;i++){
    //
    //     }
    //
    //     var _filter={
    //         $and: [
    //
    //         {
    //             $or: [{title: {$regex: condition[i], $options: 'i'}},
    //                 {companyName: {$regex: condition[i], $options: 'i'}},
    //                 {jobType: {$regex: condition[i], $options: 'i'}}]
    //         }
    //
    //             },
    //             {
    //                 $or: [{city: {$regex: condition2, $options: 'i'}}, {postcode: {$regex: condition2, $options: 'i'}}]
    //             }
    //         ]
    //
    //     },
    //
    //     JobModel.find(_filter,function (err, result) {
    //             if (err) throw err;
    //             callback(null, result);
    //         }).sort({postDate:-1,title:1}).forEach(
    //     function(item) { item.forEach(
    //
    // );
    //
    // },

    secondarySearchJob: function (keyword, location, jType, sal1,sal2, jobIndustry,callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/job');
        if(sal2==null){
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
                        salary: {$gte: sal1}
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
                            salary: {$gte: sal1, $lte: sal2}
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
        var JobModel = require('../mongoDB/models/job');
        JobModel.find({_id: id},
            function (err, result) {
                if (err) throw err;
                callback(null, result);
            });

    },

    postJob: function(jobName,company,jobIndustry,type,sal,picUrl,details,date,adStreet,adCity,adState,zipcode,adCoun,callback){
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/job');
        JobModel.create({
            title: jobName,
            companyName: company,
            industry: jobIndustry,
            jobType: type,
            city: adCity,
            postCode: zipcode,
            salary: sal,
            picture: picUrl,
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
    }

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

var a="amazon part-time";
var b="s1";


var keyArr=a.split(" ");

var key_query="";
for(var i=0;i<keyArr.length;i++){
    key_query=key_query+keyArr+"|";
}
key_query=key_query.substring(key_query.length);

let condition=new RegExp(key_query);

//console.log(role_query);
//keyword, location, jType, sal1,sal2, callback
jobData.searchJob(condition,b,function(err,docs){
    if(!err){
        console.log(docs);
    }
});
// jobData.secondarySearchJob(a,b,"Part-Time",0,null,"nanny",function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
// });

