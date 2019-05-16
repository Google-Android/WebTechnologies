/**
 * The schema of the "users" collection.
 * @type {Mongoose}
 * @last_modify_date     2019-05-16
 */

var mongoose = require ("mongoose");

var Schema=mongoose.Schema;
var userSchema=new Schema({
    email: {
        type: String,
        required: true
    },
    pwd:{
        type:String,
        required:true
    },

    personOrComp:{
        type:String,
        required:true,
        default:"p"
    },

    name:String,   // If it is a consumer user, this filed refers to company name. If it is a company user, this filed refers to first name.

    lastName:String,

    question:Number,
    answer:String,
    cv:{
        type: String,
        default:"no"

    }
});


module.exports=mongoose.model("users", userSchema);    // Export this module.