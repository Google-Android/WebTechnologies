/**
 * Encapsulated query methods related with viewing message notifications by companies.
 *
 * @type {{showUserJobCv: companyNotificationData.showUserJobCv}}
 * @last_modify_date     2019-05-17
 */
var companyNotificationData= {


    /**
     * This method is to allow companies to view which users have applied for which jobs in their companies when companies view message notifications.
     * "cvconnjobs" collection is used to map users to jobs.
     *
     * @param company
     * @param callback
     */
    showUserJobCv: function (company,callback) {
        require('../mongoDB/tools/dbUtil').dbConnection();    //Connect to the database.
        var NotificationModel = require('../mongoDB/models/cvConnJobs');   //Import the schema of the collection of cvconnjobs.
        NotificationModel.find({companyName:company},function(err,doc){
            if (err) throw err;
            callback(null, doc);
        }).sort({_id:-1});

    }

}
module.exports=companyNotificationData;   // Export this module

// companyNotificationData.showUserJobCv("Amazon",function(err,doc){
//     console.log(doc);
// });