

var jobData= {
    searchJob: function (condition, condition2, callback) {
        require('../mongoDB/tools/connection');
        var JobModel = require('../mongoDB/models/job');
        JobModel.find({
                $and: [
                    {
                        $or: [{title: {$regex: condition}}, {companyName: {$regex: condition}}, {jobType: {$regex: condition}}]
                    },
                    {
                        $or: [{city: {$regex: condition2}}, {postCode: {$regex: condition2}}]
                    }
                ]
            },

            function (err, result) {
                if (err) throw err;
                callback(null, result);
            });

    }
}

module.exports=jobData;   // export this module

