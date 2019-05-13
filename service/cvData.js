
var cvData= {
    //require('../mongoDB/models/user');
    updateCv: function(cvId,accomplishment,edu,experience){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');

        CvModel.findOne({_id:cvId},function(err,doc){
            if (err) throw err;
            else{
                doc.achievement=accomplishment;
                doc.education=edu;
                doc.workExperience=experience;
                doc.save();
            }

        });
    },

    createCv: function(accomplishment,edu,experience,callback){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvs');

        CvModel.create({
            achievement:accomplishment,
            education: edu,
            workExperience: experience

        },
            function (err, result) {
                if (err) throw err;
                callback(null, result);
            });
    },

    sendCv: function(id,company,job,callback){
        require('../mongoDB/tools/connection');
        var CvModel = require('../mongoDB/models/cvConnJobs');
        CvModel.create({
                cvId: id,
                companyName:company,
                jobTitle: job
            },
            function(err,result){
                if (err) throw err;
                callback(null, result);

        });
    }

}

module.exports=cvData;

// cvData.createCv("s","s","d",function(err,doc){
//     console.log(doc);
// })
// require('../mongoDB/tools/connection');
// var User = require('./models/user');
// // var tempCv= require("../service/cvData");
// User.findOne({email:"yiping73@sheffiled.ac.uk"},function (err, doc) {
//     if (!err) {
//         console.log(doc);
//     }
// });