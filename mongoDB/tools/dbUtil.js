
var tools={
    //用于find CVs and find jobs的一级搜索

    dealWithMultiStrings: function(condition) {
        if(condition.trim()!=="") {
            var keyArr = condition.split(" ");

            var key_query = "";
            for (var i = 0; i < keyArr.length; i++) {
                key_query = key_query + keyArr[i] + "|";
            }
            key_query = key_query.substring(0, key_query.length - 1);
            condition = new RegExp(key_query, "i");
            //callback(null, condition);
        }
        return condition;
    },


    dbConnection: function(){
        var mongoose= require ("mongoose");

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


module.exports=tools;