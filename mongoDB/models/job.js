var mongoose = require ("mongoose");

var Schema=mongoose.Schema;
var jobSchema=new Schema({
    title: String,
    companyName: String,//Schema.Types.ObjectId,
    industry:String,
    jobType:String,
    city:String,
    postCode:String,
    salary: {
        hour:Number,
        day:Number,
        week:Number,
        month:Number,
        year:Number
    },
    picture:String,
    description:String,
    postDate:String
});


module.exports=mongoose.model("jobs", jobSchema);


// JobModel.find({type:/web/ },function(err, doc) {
//         if (!err) {
//             console.log(doc);
//         }
//     });
