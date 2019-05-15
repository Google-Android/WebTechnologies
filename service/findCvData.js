/**
 *
 * @type {{secondarySearchCv: findCvData.secondarySearchCv, searchCv: findCvData.searchCv}}
 */
var findCvData= {

    //小cv，信息有限，查不了小cv
    searchCv: function (keyword, location, callback) {
        var CvModel = require('../mongoDB/models/cvs');
        var tool = require('../mongoDB/tools/dbUtil');   //Import the schema of the collection of jobs.
        tool.dbConnection();   //Connect to the database.

        var keyword = tool.dealWithMultiStrings(keyword);
        var location = tool.dealWithMultiStrings(location);

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
                        $or: [{city: {$regex: location, $options: 'i'}},
                            {postcode: {$regex: location, $options: 'i'}}]
                    }
                ]
            },
            function (err, doc) {
                if (err) throw err;
                callback(null, doc);
            }).sort({postDate: -1, title: 1});
    },


    secondarySearchCv: function (keyword, location, jType, sal, jobIndustry, callback) {
        var CvModel = require('../mongoDB/models/cvs');
        var tool = require('../mongoDB/tools/dbUtil');
        tool.dbConnection();

        //if(jType == "undefined") jType = "";
        //if(jobIndustry == "undefined") jobIndustry = "";
        //If the user does not select the salary option, the system displays a result that includes all salaries.
        //set sal="0", then look for all jobs whose salary is more than -1,000.    (sal - 1) * 1000= -1000
        if ((sal == "") || (sal = "undefined")) sal = "0";


        //dealWithMultiStrings() method allows user to input multiple strings in the keyword search box, such as "",
        //This method can convert "Amazon full-time IT" to "/Amazon|full-time|IT/i"
        var keyword = tool.dealWithMultiStrings(keyword);
        var location = tool.dealWithMultiStrings(location);

        //Query salary with no upper limit.  To be specific, query salary>3000 or salary>-1000
        if ((sal == "4") || (sal == "0")) {
            CvModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: keyword, $options: 'i'}},
                            {companyName: {$regex: keyword, $options: 'i'}},
                            {achievement: {$regex: keyword, $options: 'i'}},
                            {education: {$regex: keyword, $options: 'i'}},
                            {workExperience: {$regex: keyword, $options: 'i'}}
                        ]
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
                    }]
            }, function (err, result) {
                if (err) throw err;
                callback(null, result);
                //The search results are mainly displayed in order of the time  of posting jobs.
            }).sort({postDate: -1, title: 1});

        } else {
            CvModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: keyword, $options: 'i'}},
                            {companyName: {$regex: keyword, $options: 'i'}},
                            {achievement: {$regex: keyword, $options: 'i'}},
                            {education: {$regex: keyword, $options: 'i'}},
                            {workExperience: {$regex: keyword, $options: 'i'}}
                        ]
                    },
                    {
                        $or: [{city: {$regex: location, $options: 'i'}},
                            {postcode: {$regex: location, $options: 'i'}}]

                    },
                    {
                        jobType: {$regex: jType, $options: 'i'}
                    },
                    {
                        salary: {$gte: (sal - 1) * 1000, $lte: sal * 1000}
                    },
                    {
                        industry: {$regex: jobIndustry, $options: 'i'}
                    }
                ]
            }, function (err, result) {
                if (err) throw err;
                callback(null, result);
            }).sort({postDate: -1, title: 1});


        }
    }
}



module.exports=findCvData;   // Export this module


//
// findCvData.searchCv("this","",function(err,doc){
//     if(!err) {
//         console.log(doc);
//     }
//
// });
// location:sheffield,salary:3,industry:undefined,jobType:undefined
// findCvData.secondarySearchCv("r","sheffield","undefined","3","undefined",function(err,result){
//     console.log(result);
// });