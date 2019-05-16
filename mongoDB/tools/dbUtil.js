/**
 * Utility methods of database.
 *
 * @type {{dealWithMultiStrings: (function(*): RegExp), dbConnection: tools.dbConnection}}
 * @last_modify_date     2019-05-17
 */
var tools={

    /**
     * This method as a tool to deal with String will be called by searchJob(), secondarySearchJob(), searchCv(), secondarySearchCv().
     * This method allows users to input multiple strings in the search box, such as "Amazon Gucci full-time IT",
     * then it converts "Amazon full-time IT" to "/Amazon|Gucci|full-time|IT/i".
     *
     * @param condition
     * @returns {*}
     */
    dealWithMultiStrings: function(condition) {
        if(condition.trim()!=="") {
            //e.g. convert "Amazon Gucci full-time IT" to {Amazon,Gucci, full-time, IT}
            var keyArr = condition.split(" ");
            var key_query = "";
            //e.g. convert {Amazon, Gucci, full-time, IT} to "Amazon|Gucci|full-time|IT"
            for (var i = 0; i < keyArr.length; i++) {
                key_query = key_query + keyArr[i] + "|";
            }
            key_query = key_query.substring(0, key_query.length - 1);
            //converts "Amazon full-time IT" to "/Amazon|Gucci|full-time|IT/i". (ignore case)
            condition = new RegExp(key_query, "i");
        }
        return condition;
    },




    /**
     * This method is used to connect to database.
     * Database we choose is the MongoDB cloud database.
     */
    dbConnection: function(){
        var mongoose= require ("mongoose");

        //Database is named website. Account name is yiping and password is fanhuamemeda.
        mongoose.connect("mongodb+srv://yiping:fanhuamemeda@cluster0-1xoyl.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

        mongoose.connection.once ("open", function(){
            console.log( "connected");
        });

        mongoose.connection.once('close', function() {
            console.log('connected closed');
        });
        mongoose.connection.on('error', function() {
            console.log('can not connected');
        });
    }

}


module.exports=tools;  //Export this module.