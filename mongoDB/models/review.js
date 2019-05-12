var mongoose = require ("mongoose");

var Schema=mongoose.Schema;
var reviewSchema=new Schema({
    publisherName:String,
    objectName:String,
    score:Number,
    comment:String,
    pictureUrl:String
});


module.exports=mongoose.model("reviews", reviewSchema);

