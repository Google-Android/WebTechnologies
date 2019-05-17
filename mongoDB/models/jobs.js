/**
 * The schema of the "jobs" collection which is used to find jobs by job seekers or publish job by companies.
 *
 * @type {Mongoose}
 * @last_modify_date     2019-05-16
 *
 */
var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

var tool = require('../tools/dbUtil');
tool.dbConnection();

var jobSchema=new Schema({
    title: String,
    companyName: String,
    companyEmail:String,
    jobType:String,
    industry:String,
    salary:Number,
    description:String,
    picture:String,
    street:String,
    city:String,
    state:String,
    postcode:String,
    country:String,
    postDate:String,
    location:{
        type: [Number, Number],  //it represents latitude and longitude of the current location.
        index:"2d"               //create index in order to search jobs within a specific radius.
    },
    inUse:{
        type:String,
        default:"1"    // "1" represents published job in use. "0" represents this job has been deleted.
    }


});

module.exports=mongoose.model("jobs", jobSchema);    // Export this module.



//
    // Model=mongoose.model("jobs", jobSchema);
    // Model.updateMany({},{$set:{inUse:"1"}},function(err,doc){
    //     console.log(doc);
    // })



