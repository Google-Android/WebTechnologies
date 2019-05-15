require("./tools/connection");
var User=require("./models/user");

// User.find({},function(err,docs){
//     if(!err){
//         console.log(docs);
//     }
//     if(!docs){
//         console.log(docs);
//     }
// });


//  乱写的！！！！ 请忽略！！！
//查询语句：

//User.findOne({
  //  username: userName,
    //password: md5(md5(passWord)+'myprotect')
//});

// User.create({
//     email: "yiping73@sheffiled.ac.uk",
//     pwd:"zxc",
//     personOrComp:"p",
//     name:"yiping",   // If it is a consumer user, this filed refers to company name. If it is a company user, this filed refers to first name.
//
//     lastName:"zhao",
//
//     question:1,
//     answer:null
//
// },
//     {
//      email: "fqin2@sheffield.ac.uk",
//      pwd: "123",
//      personOrComp: "p",
//      name: "fanhua",
//      lastName: "qin",
//      question: 2,
//      answer: null
//
// },
//    {
//     email: "qinlin@sheffield.ac.uk",
//     pwd: "uuu",
//     personOrComp: "c",
//     name: "Google",
//     lastName: null,
//     question: 3,
//     answer: null
//
// });


var condition="asd";
var keyArr=condition.split(" ");
console.log(keyArr.length);