/**
 * this service is used to init the folder.
 * if the folder cannot be found, then create the folder.
 * @type {{initFolder: createFolder.initFolder}}
 */
var createFolder ={
    initFolder:function(folderName){
        try{
            fs.accessSync(folderName);
        }catch(e){
            fs.mkdirSync(folderName);
        }
    }
};

module.exports=createFolder;   // export this module

