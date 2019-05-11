/**
 * deal with password encryption.
 * using email as salt to do md5 encryption.
 */

try{
    var crypto = require('crypto');
} catch (e) {
    console.log('crypto support is disabled!');
}

var md5Ecryption={
    encryptPwd:function(email,password) {

        var saltPassword = password+':'+email;
        console.log('original password:'+password);
        console.log('salt password:'+saltPassword);

        // md5 encryption
        var md5 = crypto.createHash('md5');
        var result = md5.update(saltPassword).digest('hex');
        console.log('After md5 encryption:'+result);
        return result;
    }

    /**
     * for test
     */
    // var password ='123456';
    // var email='fqin2@sheffield.ac.uk';
    // cryptPwd(email,password);
}


module.exports=md5Ecryption;   // export this module

