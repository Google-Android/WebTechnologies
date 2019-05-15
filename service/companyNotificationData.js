
var companyNotificationData= {

    showUserJobCv: function (company,callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();    //Connect to the database.
        var NotificationModel = require('../mongoDB/models/cvConnJobs');
        NotificationModel.find({companyName:company},function(err,doc){
            if (err) throw err;
            callback(null, doc);
        })

    }



}
module.exports=companyNotificationData;   // Export this module

// companyNotificationData.showUserJobCv("Amazon",function(err,doc){
//     console.log(doc);
// });