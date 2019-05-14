
var findCvData= {



    //小cv，信息有限，查不了小cv
    searchCv: function (condition, condition2, callback) {
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');


        CvModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: condition, $options: 'i'}},
                            {jobType: {$regex: condition, $options: 'i'}},
                            {achievement: {$regex: condition, $options: 'i'}},
                            {education: {$regex: condition, $options: 'i'}},
                            {workExperience: {$regex: condition, $options: 'i'}}

                        ]
                    },
                    {
                        $or: [{city: {$regex: condition2, $options: 'i'}}, {postcode: {$regex: condition2, $options: 'i'}}]
                    }
                ]
            },

            function (err, result) {
                if (err) throw err;
                callback(null, result);
            }).sort({postDate: -1, title: 1});

    },

    secondarySearchCv: function(keyword, location, jType, sal, jobIndustry,callback) {
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');
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
            CvModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: keyword, $options: 'i'}},
                            {jobType: {$regex: keyword, $options: 'i'}},
                            {achievement: {$regex: keyword, $options: 'i'}},
                            {education: {$regex: keyword, $options: 'i'}},
                            {workExperience: {$regex:keyword, $options: 'i'}}
                        ]
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
            CvModel.find({
                    $and: [
                        {
                            $or: [{title: {$regex: keyword, $options: 'i'}},
                                {jobType: {$regex: keyword, $options: 'i'}},
                                {achievement: {$regex: keyword, $options: 'i'}},
                                {education: {$regex: keyword, $options: 'i'}},
                                {workExperience: {$regex: keyword, $options: 'i'}}
                             ]

                        },
                        {
                            $or: [{city: {$regex: location, $options: 'i'}}, {postcode: {$regex: location,$options: 'i'} }]
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

    }

}

module.exports=findCvData;   // export this module


//
// findCvData.searchCv("this","",function(err,doc){
//     if(!err) {
//         console.log(doc);
//     }
//
// });

// findCvData.secondarySearchCv("this","","undefined","1","undefined",function(err,result){
//     console.log(result);
// });