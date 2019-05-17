/**
 * All encapsulated CRUD methods related with jobs.
 *
 * @type {{secondarySearchJob: jobData.secondarySearchJob, showAllJobsByCompanyName: jobData.showAllJobsByCompanyName, postJob: jobData.postJob, searchJob: jobData.searchJob, deleteJob: jobData.deleteJob, showJobDetails: jobData.showJobDetails}}
 * @last_modify_date     2019-05-17
 */

var jobData= {

    /**
     * This method is used to search jobs roughly on the homepage of finding jobs.
     * @param keyword
     * @param location
     * @param callback
     */
    searchJob: function (keyword, location, callback) {
        var tool = require('../mongoDB/tools/dbUtil');
        var JobModel = require('../mongoDB/models/jobs');  //Import the schema of the collection of jobs.
        tool.dbConnection();   //Connect to the database.


        //dealWithMultiStrings() method allows users to input multiple strings in the search box, such as "Amazon Gucci full-time IT",
        //This method can convert "Amazon full-time IT" to "/Amazon|Gucci|full-time|IT/i".
        //Next,query these four words--"Amazon","Gucci", "full-time" and "IT" respectively in the title field, companyName field and jobType filed.
        //Take the union of query results. (Query results ignore case)
        //If parameter of dealWithMultiStrings is equal to "", this method returns "";
        var keyword=tool.dealWithMultiStrings(keyword);
        var location=tool.dealWithMultiStrings(location);


        JobModel.find({

            inUse:"1",  //Only query for published work that has not been deleted.


            //The job search page has two search boxes: the first search box for keywords and the second search box for locations.
            //Take the intersection of the two query results.
            //If users don't type any word in either of box search boxes, for example, keyword search box is empty, the results shows jobs which only meets the
            //query requirements of the other search box.
            //If users don't type any word in both of box search boxes, it returns all jobs.
            $and: [
                {
                    //The keywords you type in the first search box can be job title, company name or job type.
                    //Therefore, keywords need to be queried in the title field, companyName field and jobType field respectively,
                    //and then take the union of the query results.

                    //The reason why I still use "$regex" and "$options" when variable "keyword" and "location" have been in the form of a regular expression
                    //is that if keyword=="" or location=="", they still need to be in the form of a regular expression.
                    //It indicates if I don't use "$regex" and "$options" when keyword=="" or location=="", it returns no results rather than all jobs.
                    $or: [{title: {$regex:keyword, $options: 'i'}},
                        {companyName: {$regex:keyword, $options: 'i'}},
                        {jobType: {$regex:keyword, $options: 'i'}}]
                },
                {
                    //The location you type in the second search box can be city or postcode.
                    //Therefore, location need to be queried in the city field or postcode field respectively,
                    //and then take the union of the query results.
                    $or: [{city: {$regex:location, $options: 'i'}},
                        {postcode: {$regex:location, $options: 'i'}}]
                }
                ]
        }, function (err, doc) {
            if (err) throw err;
            callback(null, doc);
        //The search results are mainly displayed in order of the time of posting jobs.
        //If the jobs are published at the same date, alphabetize job titles.
        }).sort({postDate: -1, title: 1});


    },




    /**
     * This method is used to search jobs accurately based on multiple constraints.
     * @param keyword
     * @param location
     * @param jType
     * @param sal
     * @param jobIndustry
     * @param callback
     */
    secondarySearchJob: function(keyword, location, latitude, longitude, radius, jType, sal, jobIndustry,callback) {
        var JobModel = require('../mongoDB/models/jobs');   //Import the schema of the collection of jobs.
        var tool = require('../mongoDB/tools/dbUtil');
        tool.dbConnection();     //Connect to the database.


        //If user does not select the job type or job industry in the web page, this parameter passed in is "undefined".
        //The undefined parameter need to be converted and so as to be used to search in the database.
        if (jType == "undefined") jType = "";
        if (jobIndustry == "undefined") jobIndustry = "";
        //If the user does not select the salary option, the system displays a result that includes all salaries.
        //set sal="0", then look for all jobs whose salary is more than -1,000.    (sal - 1) * 1000= -1000
        if (sal == "undefined") sal = "0";
        if(radius=="undefined") radius=40075;
        if(latitude==""||latitude=="undefined")  latitude=53.380707;
        if(longitude==""|| longitude=="undefined") longitude= -1.483981999999969;

        //dealWithMultiStrings() method allows users to input multiple strings in the search box, such as "Amazon Gucci full-time IT",
        //This method can convert "Amazon full-time IT" to "/Amazon|Gucci|full-time|IT/i".
        //Next,query these four words--"Amazon","Gucci", "full-time" and "IT" respectively in the title field, companyName field and jobType filed.
        //Take the union of query results. (Query results ignore case)
        var keyword = tool.dealWithMultiStrings(keyword);
        var location = tool.dealWithMultiStrings(location);


        //Query salary with no upper limit.  To be specific, query salary>3000 or salary>-1000
        if ((sal == "4") || (sal == "0")) {
            JobModel.find({
                inUse: "1",  //Only query for published work that has not been deleted.

                //The parameter radius is in kilometers.
                //Radius divided by 112 means convert kilometers into radians
                location:{"$near":[latitude,longitude],$maxDistance:radius/111.2},

                //The job secondary search page has multiple search boxes.
                //Take the intersection of the multiple query results.
                $and: [
                    {
                        //The keywords you type in the first search box can be job title, company name or job type.
                        //Therefore, keywords need to be queried in the title field, companyName field and jobType field respectively,
                        //and then take the union of the query results.
                        //The reason why I still use "$regex" and "$options" when variable "keyword" and "location" have been in the form of a regular expression
                        //is that if keyword=="" or location=="", they still need to be in the form of a regular expression.
                        //It indicates if I don't use "$regex" and "$options" when keyword=="" or location=="", it returns no results rather than all jobs.
                        $or: [{title: {$regex:keyword, $options: 'i'}},
                            {companyName: {$regex:keyword, $options: 'i'}},
                            {jobType: {$regex:keyword, $options: 'i'}}]
                    },
                    {
                        //The location you type in the second search box can be city or postcode.
                        //Therefore, location need to be queried in the city field or postcode field respectively,
                        //and then take the union of the query results.
                        $or: [{city: {$regex:location, $options: 'i'}},
                            {postcode: {$regex:location, $options: 'i'}}]
                    },
                    {
                        jobType: {$regex: jType, $options: 'i'}
                    },
                    {
                        //Query salary over 3000.
                        //Or query over 0.(The actual query is greater than -1000)
                        salary: {$gte: (sal - 1) * 1000}
                    },
                    {
                        industry: {$regex: jobIndustry, $options: 'i'}
                    }]
            }, function (err, result) {
                if (err) throw err;
                callback(null, result);

            //The search results are mainly displayed in order of the time of posting jobs.
            //If the jobs are published at the same date, alphabetize job titles.
            }).sort({postDate: -1, title: 1});


        //Query salary which has an upper limit and a lower limit. To be specific, 1000>salary>0, 2000>salary>1000, 3000>salary>2000
        } else {
            JobModel.find({

                inUse: "1",

                // location:{"$near":[latitude,longitude],$maxDistance:radius/111.2},

                $and: [
                    {
                        $or: [{title: {$regex: keyword, $options: 'i'}},
                            {companyName: {$regex: keyword, $options: 'i'}},
                            {jobType: {$regex: keyword, $options: 'i'}}]
                    },
                    {
                        $or: [{city: {$regex: location, $options: 'i'}},
                            {postcode: {$regex: location, $options: 'i'}}]
                    },
                    {
                        jobType: {$regex: jType, $options: 'i'}
                    },
                    {
                        //Query salary between 0 and 1000, 1000 and 2000, 2000 and 3000.
                        salary: {$gte: (sal - 1) * 1000, $lte: sal * 1000}
                    },
                    {
                        industry: {$regex: jobIndustry, $options: 'i'}
                    }
                ]
            }, function (err, result) {
                if (err) throw err;
                callback(null, result);

            //The search results are mainly displayed in order of the time of posting jobs.
            //If the jobs are published at the same date, alphabetize job titles.
            }).sort({postDate: -1, title: 1});
        }

    },


    /**
     * it is used to search similar jobs within specific distance
     * @param keyword
     * @param latitude
     * @param longitude
     * @param callback
     */
    searchSimilarJob:function(keyword,latitude,longitude,callback){
        var JobModel = require('../mongoDB/models/jobs');   //Import the schema of the collection of jobs.
        var tool = require('../mongoDB/tools/dbUtil');
        tool.dbConnection();     //Connect to the database.
        var radius=5000;
        var keyword = tool.dealWithMultiStrings(keyword);
        JobModel.find({
                inUse: "1", //Only query for published work that has not been deleted.

                //The parameter radius is in kilometers.
                //Radius divided by 112 means convert kilometers into radians
                location:{"$near":[latitude,longitude],$maxDistance:radius/111.2},


                title: {$regex:keyword, $options: 'i'}
                }, function (err, result) {
                    if (err) throw err;
                    callback(null, result);

         //The search results are mainly displayed in order of the time of posting jobs.
         //If the jobs are published at the same date, alphabetize job titles.
        }).sort({postDate: -1, title: 1});

    },







    /**
     * View what jobs this company published.
     * @param company
     * @param callback
     */
    showAllJobsByCompanyName: function(company, callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();  //Connect to the database.
        var JobModel = require('../mongoDB/models/jobs');   //Import the schema of the collection of jobs.
        JobModel.find({companyName: company, inUse:"1"},   //Only query for published work that has not been deleted.
            function (err, result) {
                if (err) throw err;
                callback(null, result);
        });

    },



    /**
     * View the whole information of this job based on the job ID.
     * @param id
     * @param callback
     */
    showJobDetails: function(jobId, callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();   //Connect to the database.
        var JobModel = require('../mongoDB/models/jobs');    //Import the schema of the collection of jobs.
        JobModel.findOne({_id: jobId},
            function (err, result) {
                if (err) throw err;
                callback(null, result);
        });
    },



    searchSingleJob: function(condition, callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();   //Connect to the database.
        var JobModel = require('../mongoDB/models/jobs');    //Import the schema of the collection of jobs.
        JobModel.findOne(condition,
            function (err, result) {
                if (err) throw err;
                callback(null, result);
            });

    },




    /**
     * When company posts jobs, job information will be inserted into the database.
     *
     * @param jobName
     * @param company
     * @param email
     * @param jobIndustry
     * @param type
     * @param sal
     * @param picUrl
     * @param details
     * @param date
     * @param adStreet
     * @param adCity
     * @param adState
     * @param zipcode
     * @param adCountry
     * @param callback
     */
    postJob: function(jobName,company,email,jobIndustry,type,sal,picUrl,details,date,adStreet,adCity,adState,zipcode,adCountry,latitude,longitude,callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();   //Connect to the database.
        var JobModel = require('../mongoDB/models/jobs');    //Import the schema of the collection of jobs.

        var keyArr =zipcode.split(" ");
        var key_query = "";
        for (var i = 0; i < keyArr.length; i++) {
            key_query = key_query + keyArr[i];
        }

        JobModel.create({
                title: jobName,
                companyName: company,
                companyEmail: email,
                industry: jobIndustry,
                jobType: type,
                city: adCity,
                postcode: key_query,
                salary: sal,
                picture: "../image/" + picUrl,
                description: details,
                postDate: date,
                street: adStreet,
                state: adState,
                country: adCountry,
                location:  [latitude, longitude],
                inUse:"1"     //By default, published jobs are set in use, which means this job can be viewed or be searched on subsequent operations.
            },
            function (err, result) {
                if (err) throw err;
                callback(null, result);
        });
    },




    /**
     * When company deletes this job, inUse field of jobs collection is set "0".
     * It means job information doesn't be deleted actually, even though company chooses to delete this published job.
     * @param jobId
     * @param callback
     */
    deleteJob: function(jobId,callback){
        require('../mongoDB/tools/dbUtil').dbConnection();    //Connect to the database.
        var JobModel = require('../mongoDB/models/jobs');     //Import the schema of the collection of jobs.
        JobModel.findOne({_id:jobId},function(err,doc){
            if (err) throw err;
            else{
                doc.inUse="0";
                doc.save();
                callback(null, doc);
            }
        });
    }

};

module.exports=jobData;  //Export this module






// jobData.showAllJobsByCompanyName("Amazon", function(err,doc) {
//     console.log(doc);
//
//
// });



// jobData.deleteJob("5cd6c3fe161fea127cc1c625",function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// });


// jobData.postJob("dd","d","f",'e',"22",333,"s.jpg","London","11.jpg",
//     "f","12-01","d","d","d",2,3,function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
//     })


// var http = require('http');
// var server = http.createServer();
//
//
// server.on('request', function (req, res) {
//     var a;
//     jobData.showJobDetails("5cd7eea7f7cc5623797890b2", function (err, doc) {
//         if (!err) {
//             console.log(doc.description);
//             a=doc.description;
//             res.setHeader('Content-Type', 'text/html; charset=utf-8');
//             res.end("<p>"+a+"</p>");
//
//         }
//     });
//
// })
//     server.listen(5000, function () {
//         console.log('Server is running...')
//     });





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

// jobData.searchJob("","",function(err,docs){
//     if(!err){
//         console.log(docs.length);
//     }
// });


// jobData.searchSimilarJob("java","53","-1",function(err,doc){
//     console.log(doc)
// })
// var a="amazon";
// var b="s1";

// jobData.
//
//
// jobData.secondarySearchJob("","","","","","","","",function(err,doc){
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



// secondarySearchJob: function(keyword, location, jType, sal, jobIndustry,callback) {
//     var JobModel = require('../mongoDB/models/jobs');
//     var tool = require('../mongoDB/tools/dbUtil');
//     tool.dbConnection();
//
//     if(jobIndustry=="undefined"){
//         jobIndustry="";
//     }
//     if(jType=="undefined"){
//         jType="";
//     }
//     if(sal=="undefined"){
//         sal="0";            //   -1000
//     }
//
//     tool.dealWithMultiStrings(keyword, function (err, result) {
//         if (!err) {
//             if ((sal == "4") || (sal == "0")) {
//                 JobModel.find({
//                     $and: [
//                         {
//                             $or: [{title: result},
//                                 {companyName: result},
//                                 {jobType: result}]
//                         },
//                         {
//                             $or: [{city: {$regex: location, $options: 'i'}},
//                                   {postcode: {$regex: location, $options: 'i'}}]
//                         },
//                         {
//                             jobType: {$regex: jType, $options: 'i'}
//                         },
//                         {
//                             salary: {$gte: (sal - 1) * 1000}
//                         },
//                         {
//                             industry: {$regex: jobIndustry, $options: 'i'}
//                         }
//                     ]
//                 }, function (err, result) {
//                     if (err) throw err;
//                     callback(null, result);
//                 }).sort({postDate: -1, title: 1});
//
//
//             } else {
//                 JobModel.find({
//                         $and: [
//                             {
//                                 $or: [{title: result},
//                                     {companyName: result},
//                                     {jobType: result}]
//                             },
//                             {
//                                 $or: [{city: {$regex: location, $options: 'i'}},
//                                     {postcode: {$regex: location, $options: 'i'}}]
//                             }, {
//                                 jobType: {$regex: jType, $options: 'i'}
//                             }, {
//                                 salary: {$gte: (sal - 1) * 1000, $lte: sal * 1000}
//                             }, {
//                                 industry: {$regex: jobIndustry, $options: 'i'}
//                             }
//                         ]
//                     },
//
//                     function (err, result) {
//                         if (err) throw err;
//                         callback(null, result);
//                     }).sort({postDate: -1, title: 1});
//             }
//         }
//         });
// },

