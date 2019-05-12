
var jobData= {
    searchJob: function (condition, condition2, callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/job');
        JobModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: condition, $options: 'i'}}, {
                            companyName: {
                                $regex: condition,
                                $options: 'i'
                            }
                        }, {jobType: {$regex: condition, $options: 'i'}}]
                    },
                    {
                        $or: [{city: {$regex: condition2, $options: 'i'}}, {postCode: {$regex: condition2, $options: 'i'}}]
                    }
                ]
            },

            function (err, result) {
                if (err) throw err;
                callback(null, result);
            }).sort({postDate:-1,title:1});

    },

    secondarySearchJob: function (keyword, location, jType, sal1,sal2, callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/job');
        if(sal2==null){
            JobModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: keyword, $options: 'i'}}, {
                            companyName: {$regex: keyword,$options: 'i'}
                        }]
                    },
                    {
                        $or: [{city: {$regex: location, $options: 'i'}}, {postCode: {$regex: location, $options: 'i'}}]
                    }, {
                        jobType: {$regex: jType, $options: 'i'}
                    }, {
                        "salary.year": {$gte: sal1}
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
                                postCode: {
                                    $regex: location,
                                    $options: 'i'
                                }
                            }]
                        }, {
                            jobType: {$regex: jType, $options: 'i'}
                        }, {
                            "salary.year": {$gte: sal1, $lte: sal2}
                        }
                    ]
                },

                function (err, result) {
                    if (err) throw err;
                    callback(null, result);
                }).sort({postDate:-1,title:1});
        }

    },

    showJobDetails: function (company, callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/job');
        JobModel.find({companyName: company},
            function (err, result) {
                if (err) throw err;
                callback(null, result);
            });

    }
};

module.exports=jobData;   // export this module






// jobData.showJobDetails("urban outfitters",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// })

// var a="amazon";
// var b="s1";

//console.log(role_query);
//keyword, location, jType, sal1,sal2, callback
// jobData.searchJob(a,b,function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
// });
// jobData.secondarySearchJob(a,b,"Part-Time",30000,null,function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
// });

