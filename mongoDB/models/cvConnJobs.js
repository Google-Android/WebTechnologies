var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

var cvConnJobSchema=new Schema({
    cvId: String,
    companyName:String,
    jobTitle: String
});


module.exports=mongoose.model("cvconnjobs", cvConnJobSchema);