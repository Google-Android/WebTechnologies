var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

var cvConnJobSchema=new Schema({
    userId:String,
    username:String,
    cvId: String,
    companyName:String,
    jobTitle: String,
    jobId:String
});


module.exports=mongoose.model("cvconnjobs", cvConnJobSchema);