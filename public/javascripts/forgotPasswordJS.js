/**
 * show notification when the two passwords entered by consumers are not consistent in password reset webpage.
 * @returns {boolean}
 */
var passwordCheck = function () {
    var check = false;
    if (document.getElementById('resetPassword').value ==
        document.getElementById('resetRepeatPassword').value) {
        $('#passwordCheck').hide();
        check = true;
    } else {
        $('#passwordCheck').show();
        check = false;
    }
    return check;
}

/**
 * called by "reset" button, if all check progress passed, "reset"  button will work
 * @returns {boolean}
 */
function checkAll() {
    // var check = passwordCheck() && checkpwd() && checkpwdc() && checkcb();
    var check = passwordCheck();
    return check;

}