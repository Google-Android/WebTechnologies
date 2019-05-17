/**
 * This file is used for uploading service.
 */
// use fs to create or access folder
// var fs = require('fs');

// use multer to upload file
var multer = require('multer');

var uploadPath = './public/image/';

var uploadService={

    uploadFile:function (currentTime) {

        // try{
        //     // fs.accessSync('./public/image/');
        //     fs.accessSync(uploadPath);
        // }catch(e){
        //     // fs.mkdirSync('./public/image/');
        //     fs.mkdirSync(uploadPath);
        // }

        var storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null,uploadPath);
            },
            filename: function(req,file,cb){
                cb(null,currentTime+'-'+file.originalname);
            }
        });
        var upload = multer({storage:storage});//上传路径
        return upload;
    }
}

module.exports=uploadService;   // export this module
