/**
 * The schema of the "reviews" collection.
 *
 * @type {Mongoose}
 * @last_modify_date     2019-05-16
 */

var mongoose = require ("mongoose");

var Schema=mongoose.Schema;
var reviewSchema=new Schema({
    publisherName:String,
    objectName:String,
    score:Number,
    comment:String,
    pictureUrl:String,        //After the user uploads the image, the path is stored in the project
    title:String              //The review title
});


module.exports=mongoose.model("reviews", reviewSchema);   // Export this module.

