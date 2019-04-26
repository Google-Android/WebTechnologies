require("./tools/connection");
var User=require("../models/user");

User.find({},function(err,docs){
    if(!err){
        console.log(docs);
    }
    if(!docs){
        console.log(docs);
    }
});


//  乱写的！！！！ 请忽略！！！
//查询语句：

Judger.findOne({
    username: userName,
    password: md5(md5(passWord)+'myprotect')
}