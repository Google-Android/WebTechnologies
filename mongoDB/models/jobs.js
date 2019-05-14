    var mongoose = require ("mongoose");

var Schema=mongoose.Schema;
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
    longitude:Number,
    latitude:Number,
    inUse:String   // "1" represents published job in use. "0" represents this job has been deleted.

});


module.exports=mongoose.model("jobs", jobSchema);

    //
    // Model=mongoose.model("jobs", jobSchema);
    // Model.updateMany({},{$set:{inUse:"1"}},function(err,doc){
    //     console.log(doc);
    // })



