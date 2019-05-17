/**
 * methods related with creating and showing reviews.
 * @type {{searchReview: reviewData.searchReview, createReview: reviewData.createReview}}
 * @last_modify_date     2019-05-17
 */

var reviewData= {
    /**
     * It is used to insert data into the collection of reviews.
     *
     * @param publisher
     * @param object
     * @param rating
     * @param review
     * @param picUrl
     * @param reviewTitle
     * @param callback
     */
    createReview: function (publisher, object,rating,review,picUrl,reviewTitle,callback) {
        // require('../mongoDB/tools/dbUtil').dbConnection();    //Connect to the database.
        var Review = require('../mongoDB/models/reviews');    //Import the schema of the collection of reviews.
        Review.create({
            publisherName:publisher,
            objectName:object,
            score:rating,
            comment:review,
            pictureUrl:"../image/"+picUrl,          //User can upload picture. database stores the path of the picture.
            title:reviewTitle
        }, function (err, doc) {
            if (err) throw err;
            callback(null, doc);
        });
    },




    /**
     * It is used to view specified review.
     *
     * @param object
     * @param callback
     */
    searchReview: function(object,callback){
        // require('../mongoDB/tools/dbUtil').dbConnection();    //Connect to the database.
        var Review = require('../mongoDB/models/reviews');    //Import the schema of the collection of reviews.
        Review.find({
            objectName: object
        },function(err, doc){
            if (err) throw err;
            callback(null, doc);
        });
    }

}


module.exports=reviewData;   // Export this module





//test for myself
// reviewData.createReview("admin@nextTopGame.com","fqin2@sheffield.ac.uk",3,"fff","hello.txt",
//     function(err,docs){
//         if(!err){
//             console.log(docs);
//             var fs = require('fs')
//             fs.readFile(docs.pictureUrl,function (error, data) {
//                 if (error) {
//                     console.log('读取文件失败了')
//                 } else {
//                     console.log(data.toString())
//                 }
//             })
//
//
//         }
//
// })

// reviewData.searchReview("fqin2@sheffield.ac.uk", function(err,docs){
//     if (!err){
//         console.log(docs);
//     }
// })



