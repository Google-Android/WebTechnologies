var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

var cvSchema=new Schema({
    achievement: String,
    education:String,
    workExperience: String,
    title:String,
    jobType:String,
    industry:String,
    salary:Number,
    profileUrl:String,
    street:String,
    city:String,
    state:String,
    postcode:String,
    country:String,
    postDate:String,
    longitude:Number,
    latitude:Number


    //companyName: String,   username last name  email
   // companyEmail:String,




});


module.exports=mongoose.model("cvs", cvSchema);