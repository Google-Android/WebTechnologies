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
    answer:String
});


module.exports=mongoose.model("user", userSchema);