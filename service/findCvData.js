/**
 * Encapsulated methods for searching CVs.
 *
 * @type {{secondarySearchCv: findCvData.secondarySearchCv, searchCv: findCvData.searchCv}}
 * @last_modify_date     2019-05-17
 *
 */
var findCvData= {


    /**
     * This method is used to search CVs roughly on the homepage of finding CVs.
     *
     * @param keyword
     * @param location
     * @param callback
     */
    searchCv: function (keyword, location, callback) {
        var CvModel = require('../mongoDB/models/cvs');  //Import the schema of the collection of cvs.
        var tool = require('../mongoDB/tools/dbUtil');
        // tool.dbConnection();                                   //Connect to the database.


        //dealWithMultiStrings() method allows users to input multiple strings in the search box, such as "MySQL Java mongoDB IT",
        //This method can convert "MySQL Java mongoDB IT" to "/MySQL|Java|mongoDB|IT/i".
        //Next,query these four words--"MySQL", "Java", "mongoDB" and "IT" respectively in the title field, jobType field, achievement filed, education field,
        //workExperience field. Take the union of query results. (Query results ignore case)
        //If parameter of dealWithMultiStrings is equal to "", this method returns "";
        var keyword = tool.dealWithMultiStrings(keyword);
        var location = tool.dealWithMultiStrings(location);

        CvModel.find({


                //The cv search page has two search boxes: the first search box for keywords and the second search box for locations.
                //Take the intersection of the two query results.
                //If users don't type any word in either of box search boxes, for example, keyword search box is empty, the results shows CVs which only meets the
                //query requirements of the other search box.
                //If users don't type any word in both of box search boxes, it returns all CVs.
                $and: [
                    {

                        //The keywords you type in the first search box can be job title, job type, personal achievement, education background or work experience.
                        //Therefore, keywords need to be queried in the title field, jobType field, achievement field, education field or workExperience field respectively,
                        //and then take the union of the query results.

                        //The reason why I still use "$regex" and "$options" when variable "keyword" and "location" have been in the form of a regular expression
                        //is that if keyword=="" or location=="", they still need to be in the form of a regular expression.
                        //It indicates if I don't use "$regex" and "$options" when keyword=="" or location=="", it returns no results rather than all CVs.
                        $or: [{title: {$regex: keyword, $options: 'i'}},
                            {jobType: {$regex: keyword, $options: 'i'}},
                            {achievement: {$regex: keyword, $options: 'i'}},
                            {education: {$regex: keyword, $options: 'i'}},
                            {workExperience: {$regex: keyword, $options: 'i'}}
                        ]

                    },
                    {
                        //The location you type in the second search box can be city or postcode.
                        //Therefore, location need to be queried in the city field or postcode field respectively,
                        //and then take the union of the query results.
                        $or: [{city: {$regex: location, $options: 'i'}},
                            {postcode: {$regex: location, $options: 'i'}}]
                    }
                    ]
        },function (err, doc) {
            if (err) throw err;
            callback(null, doc);

        //The search results are mainly displayed in order of the time of job request.
        //If the release works at the same time, alphabetize titles.
        }).sort({postDate: -1, title: 1});
    },


    /**
     * This method is used to search CVs accurately based on multiple constraints.
     *
     * @param keyword
     * @param location
     * @param jType
     * @param sal
     * @param jobIndustry
     * @param callback
     */
    secondarySearchCv: function (keyword, location, jType, sal, jobIndustry, callback) {
        var CvModel = require('../mongoDB/models/cvs');  //Import the schema of the collection of cvs.
        var tool = require('../mongoDB/tools/dbUtil');
        // tool.dbConnection();                                   //Connect to the database.


        //If the user does not select the salary option, the system displays a result that includes all salaries.
        //set sal="0", then look for all jobs whose salary is more than -1,000.    (sal - 1) * 1000= -1000
        if ((sal == "") || (sal = "undefined")) sal = "0";


        //dealWithMultiStrings() method allows users to input multiple strings in the search box, such as "MySQL Java mongoDB IT",
        //This method can convert "MySQL Java mongoDB IT" to "/MySQL|Java|mongoDB|IT/i".
        //Next,query these four words--"MySQL", "Java", "mongoDB" and "IT" respectively in the title field, jobType field, achievement filed, education field,
        //workExperience field. Take the union of query results. (Query results ignore case)
        //If parameter of dealWithMultiStrings is equal to "", this method returns "";
        var keyword = tool.dealWithMultiStrings(keyword);
        var location = tool.dealWithMultiStrings(location);

        //Query salary with no upper limit.  To be specific, query salary>3000 or salary>-1000
        if ((sal == "4") || (sal == "0")) {
            CvModel.find({

                //The CV secondary search page has multiple search boxes.
                //Take the intersection of the multiple query results.
                $and: [
                    {
                        //The keywords you type in the first search box can be job title, job type, personal achievement, education background or work experience.
                        //Therefore, keywords need to be queried in the title field, jobType field, achievement field, education field or workExperience field respectively,
                        //and then take the union of the query results.

                        //The reason why I still use "$regex" and "$options" when variable "keyword" and "location" have been in the form of a regular expression
                        //is that if keyword=="" or location=="", they still need to be in the form of a regular expression.
                        //It indicates if I don't use "$regex" and "$options" when keyword=="" or location=="", it returns no results rather than all CVs.
                        $or: [{title: {$regex: keyword, $options: 'i'}},
                            {companyName: {$regex: keyword, $options: 'i'}},
                            {achievement: {$regex: keyword, $options: 'i'}},
                            {education: {$regex: keyword, $options: 'i'}},
                            {workExperience: {$regex: keyword, $options: 'i'}}]
                    },
                    {
                        //The location you type in the second search box can be city or postcode.
                        //Therefore, location need to be queried in the city field or postcode field respectively,
                        //and then take the union of the query results.
                        $or: [{city: {$regex: location, $options: 'i'}},
                            {postcode: {$regex: location, $options: 'i'}}]
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

            //The search results are mainly displayed in order of the time of job request.
            //If the release works at the same time, alphabetize titles.
            }).sort({postDate: -1, title: 1});


        //Query salary which has an upper limit and a lower limit. To be specific, 1000>salary>0, 2000>salary>1000, 3000>salary>2000
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


            //The search results are mainly displayed in order of the time of job request.
            //If the release works at the same time, alphabetize titles.
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