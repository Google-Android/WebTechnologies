/**
 * The schema of the "reviews" collection.
 *
 * @type {Mongoose}
 * @last_modify_date     2019-05-16
 *
 */

var mongoose = require ("mongoose");

var Schema=mongoose.Schema;

require('../tools/dbUtil').dbConnection();

var reviewSchema=new Schema({
    publisherName:String,     //The name of the person who posted the comment
    objectName:String,        //The name of the person being reviewed
    score:Number,             //Rating
    comment:String,
    pictureUrl:String,        //After the user uploads the image, the picture path is stored in the project
    title:String              //The review title
});


module.exports=mongoose.model("reviews", reviewSchema);   // Export this module.

