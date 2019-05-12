
var reviewData= {

    createReview: function (publisher, object,rating,review,picUrl,callback) {
        require('../mongoDB/tools/connection');
        var Review = require('../mongoDB/models/review');
        Review.create({
            publisherName:publisher,
            objectName:object,
            score:rating,
            comment:review,
            pictureUrl:"../image/"+picUrl
        }, function (err, doc) {
            if (err) throw err;
            callback(null, doc);
        });
    },
    searchReview: function(object,callback){
        require('../mongoDB/tools/connection');
        var Review = require('../mongoDB/models/review');
        Review.find({
            objectName: object
        },
            function(err, doc){
            if (err) throw err;
            callback(null, doc);
        })
    }

}


module.exports=reviewData;   // export this module





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



