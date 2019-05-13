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
    postDate:String
});


module.exports=mongoose.model("jobs", jobSchema);


// JobModel.find({type:/web/ },function(err, doc) {
//         if (!err) {
//             console.log(doc);
//         }
//     });
