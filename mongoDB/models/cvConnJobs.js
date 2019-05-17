/**
 * The schema of the "cvconnjob" collection which is used to map users to jobs.
 *
 * @type {Mongoose}
 * @last_modify_date     2019-05-16
 *
 */

var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

require('../tools/dbUtil').dbConnection();

var cvConnJobSchema=new Schema({
    userId:String,        //job seeker's ID
    username:String,      //job seeker's name
    cvId: String,         //the CV ID of job seeker
    companyName:String,   //the company name that job seeker applied for
    jobTitle: String,     //the job title of this company that job seeker applied for
    jobId:String          //the ID of "jobs" collection
});


module.exports=mongoose.model("cvconnjobs", cvConnJobSchema);   // Export this module.