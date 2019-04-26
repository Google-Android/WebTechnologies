var mongoose = require ("mongoose");

var Schema=mongoose.Schema;
var userSchema=new Schema({
    username: {
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
        email:String

});


module.exports=mongoose.model("user", userSchema);