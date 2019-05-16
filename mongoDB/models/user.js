/**
 * The schema of the "users" collection.
 *
 * @type {Mongoose}
 * @last_modify_date     2019-05-16
 */

var mongoose = require ("mongoose");

var Schema=mongoose.Schema;
var userSchema=new Schema({
    email: {
        type: String,         //consumer or company's email as the account name, which is unique.
        required: true
    },
    pwd:{
        type:String,
        required:true
    },

    personOrComp:{            //judge this user is person or company
        type:String,
        required:true,
        default:"p"
    },

    name:String,              //If it is a consumer user, this filed refers to first name. If it is a company user, this filed refers to company name.

    lastName:String,          //If it is a company user, this filed is null.

    question:Number,          //security question
    answer:String,            //the answer of security question
    cv:{                      //cv ID of consumer
        type: String,
        default:"no"          //When registering the account, the default value of cv ID is "no".

    }
});


module.exports=mongoose.model("users", userSchema);    // Export this module.