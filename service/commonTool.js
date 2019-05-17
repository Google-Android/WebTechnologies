var commonTool={
    formatDate:function(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var weekday = date.getDate();

        if (month < 10) {
            month = "0" + month;
        }
        if (weekday < 10) {
            weekday = "0" + weekday;
        }
        return (weekday + "/" + month + "/" + year);
    }
}



module.exports=commonTool;   // export this module


/**
 * for test
 */
// console.log(commonTool.formatDate(new Date()));
