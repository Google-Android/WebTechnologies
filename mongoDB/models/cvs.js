var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

var cvSchema=new Schema({
    achievement: String,
    education:String,
    workExperience: String
});


module.exports=mongoose.model("cvs", cvSchema);