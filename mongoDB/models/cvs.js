/**
 * The schema of the "cvs" collection which is used to find CVs and post job request.
 *
 * @type {Mongoose}
 * @last_modify_date     2019-05-16
 *
 */

var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

require('../tools/dbUtil').dbConnection();

var cvSchema=new Schema({
    achievement: String,        //one entry of CV information
    education:String,           //one entry of CV information
    workExperience: String,     //one entry of CV information
    title:String,               //one entry of basic Information
    jobType:String,             //one entry of basic Information
    industry:String,            //one entry of basic Information
    salary:Number,              //one entry of basic Information
    profileUrl:String,          //one entry of basic Information
    street:String,              //one entry of intentional workplace
    city:String,                //one entry of intentional workplace
    state:String,               //one entry of intentional workplace
    postcode:String,            //one entry of intentional workplace
    country:String,             //one entry of intentional workplace
    postDate:String             //one entry of intentional workplace

});


module.exports=mongoose.model("cvs", cvSchema);  // Export this module.